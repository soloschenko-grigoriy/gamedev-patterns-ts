import { StateMachina } from './state-machina'
import { IAction, ICondition, IState, ITransition } from './state-machina.h'

interface IHasPosition {
  Position: number
}

interface IHasHealth {
  Health: number
}

interface IMovable {
  Speed: number
}

interface IPlayer extends IHasPosition, IHasHealth {
  Health: number
}

interface IEnemy extends IHasPosition, IMovable {
  Speed: number
}

class EnemyStateMachina extends StateMachina<IEnemy> {
  constructor(Owner: IEnemy, public readonly Player: IPlayer){
    super(Owner)
  }
}

class IsInDistance implements ICondition {
  constructor(
    private _distance: number,
    private _target: IHasPosition,
    private _center: IHasPosition
  ){}

  public Check(): boolean {
    return this._target.Position - this._center.Position < this._distance
  }
}

class IsTargetDead implements ICondition {
  constructor(private _target: IHasHealth){}

  public Check(): boolean {
    const result = this._target.Health <= 0
    return result
  }
}

class EnemyIdleToChase implements ITransition {
  public TrueCondition = new IsInDistance(5, this._stateMachina.Player, this._stateMachina.Owner)

  public FalseCondition = null

  public get Target(): EnemyChase {
    return this._stateMachina.States.find(s => s instanceof EnemyChase) as EnemyChase
  }

  constructor(private readonly _stateMachina: EnemyStateMachina){}
}

class EnemyChaseToAttack implements ITransition {
  public TrueCondition = new IsInDistance(3, this._stateMachina.Player, this._stateMachina.Owner)
  public FalseCondition  = null

  public get Target(): EnemyAttack {
    return this._stateMachina.States.find(s => s instanceof EnemyAttack) as EnemyAttack
  }

  constructor(private readonly _stateMachina: EnemyStateMachina){}
}

class EnemyAttackToIdle implements ITransition {
  public TrueCondition =  new IsTargetDead(this._stateMachina.Player)
  public FalseCondition = null

  public get Target(): EnemyIdle {
    return this._stateMachina.States.find(s => s instanceof EnemyIdle) as EnemyIdle
  }

  constructor(private readonly _stateMachina: EnemyStateMachina){}
}

class EnemyIdle implements IState {
  public OnEnterActions: IAction[] = [new Whistle('I am Enemy la-la-la')]
  public OnUpdateActions: IAction[] = []
  public OnExitActions: IAction[] = []

  public Transitions: ITransition[] = [
    new EnemyIdleToChase(this._stateMachina)
  ]

  constructor(private readonly _stateMachina: EnemyStateMachina){}
}

class EnemyChase implements IState {
  public OnEnterActions: IAction[] = [
    new StartChase(this._stateMachina.Owner)
  ]

  public OnUpdateActions: IAction[] = [
    new Chase(this._stateMachina.Owner)
  ]

  public OnExitActions: IAction[] = [
    new StopChase(this._stateMachina.Owner)
  ]

  public Transitions: ITransition[] = [
    new EnemyChaseToAttack(this._stateMachina)
  ]

  constructor(private readonly _stateMachina: EnemyStateMachina){}
}

class EnemyAttack implements IState {
  public OnEnterActions: IAction[] = []

  public OnUpdateActions: IAction[] = [
    new Hit(this._stateMachina.Player)
  ]

  public OnExitActions: IAction[] = []

  public Transitions: ITransition[] = [
    // new EnemyAttackToChase(this._stateMachina),
    new EnemyAttackToIdle(this._stateMachina)
  ]

  constructor(private readonly _stateMachina: EnemyStateMachina){}
}

class Whistle implements IAction {
  constructor(private _song: string){}

  public Execute(deltaTime: number): void {
    console.log(this._song)
  }
}

class StartChase implements IAction {
  constructor(private _target: IMovable){}

  public Execute(deltaTime: number): void {
    this._target.Speed = 1
  }
}

class Chase implements IAction {
  constructor(private _subject: IHasPosition){}

  public Execute(deltaTime: number): void {
    this._subject.Position++
  }
}

class StopChase implements IAction {
  constructor(private _target: IMovable){}

  public Execute(deltaTime: number): void {
    this._target.Speed = 0
  }
}

class Hit implements IAction {
  constructor(private _target: IHasHealth){}

  public Execute(deltaTime: number): void {
    let health  = this._target.Health - 1
    if(health < 0){
      health = 0
    }

    this._target.Health = health
  }
}

describe('Enemy State Machina e2e test', () => {
  it('should start with Init state, transition to Chase, then to Attack and back to Idle', () => {
    // Setup the State Machina
    const player: IPlayer = { Health: 5, Position: 10 }
    const enemy: IEnemy = { Speed: 0, Position: 1 }
    const stateMachina = new EnemyStateMachina(enemy, player)
    const idleState = new EnemyIdle(stateMachina)
    const chaseState = new EnemyChase(stateMachina)
    const attackState = new EnemyAttack(stateMachina)

    stateMachina.SetStates([idleState, chaseState, attackState], idleState)
    stateMachina.Start()

    // Starts with Init state
    expect(stateMachina.Current).toBeInstanceOf(EnemyIdle)

    // Whistles on every Update
    stateMachina.Update(100)
    expect(stateMachina.Current).toBeInstanceOf(EnemyIdle)

    // when Player comes close, transition to Chase
    player.Position = 5
    stateMachina.Update(200)
    expect(stateMachina.Current).toBeInstanceOf(EnemyChase)

    // When Chase starts speed should become 1
    expect(enemy.Speed).toEqual(1)
    expect(enemy.Position).toBe(2)

    // Enemy should keep chasing Player on every Update
    stateMachina.Update(300)
    expect(enemy.Position).toBe(3)
    expect(stateMachina.Current).toBeInstanceOf(EnemyChase)

    // When get close enough to Player, transition to Attack
    stateMachina.Update(400)
    expect(stateMachina.Current).toBeInstanceOf(EnemyAttack)

    // Make sure speed got to 0 and reduced Player's health immediacy
    expect(enemy.Speed).toEqual(0)
    expect(player.Health).toEqual(4)

    // Reduces Player's health on every Update
    stateMachina.Update(500)
    expect(player.Health).toEqual(3)
    expect(stateMachina.Current).toBeInstanceOf(EnemyAttack)

    stateMachina.Update(600)
    expect(player.Health).toEqual(2)
    expect(stateMachina.Current).toBeInstanceOf(EnemyAttack)

    stateMachina.Update(700)
    expect(player.Health).toEqual(1)
    expect(stateMachina.Current).toBeInstanceOf(EnemyAttack)

    stateMachina.Update(800)
    expect(player.Health).toEqual(0)
    expect(stateMachina.Current).toBeInstanceOf(EnemyAttack)

    // After Player dies transition back to Idle
    stateMachina.Update(900)
    expect(stateMachina.Current).toBeInstanceOf(EnemyIdle)
  })
})
