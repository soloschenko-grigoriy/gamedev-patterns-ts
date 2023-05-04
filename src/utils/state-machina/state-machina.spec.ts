import { StateMachina } from './state-machina'
import { IAction, ICondition, IState, ITransition } from './state-machina.h'

interface ITestOwner {
  Parameter?: boolean
}

class TestStateMachina extends StateMachina<ITestOwner> {}

class Action implements IAction {
  public Execute(deltaTime: number): void {
    console.log(deltaTime)
  }
}

class InitState implements IState {
  OnEnterActions: IAction[] = []
  OnUpdateActions: IAction[] = []
  OnExitActions: IAction[] = []
  Transitions = [new InitToPositive(this._stateMachina), new InitToNegative(this._stateMachina)]

  constructor(private readonly _stateMachina: TestStateMachina){}
}

class PositiveState implements IState {
  OnEnterActions: IAction[] = []
  OnUpdateActions: IAction[] = []
  OnExitActions: IAction[] = []
  Transitions: ITransition[] = []

  constructor(private readonly _stateMachina: TestStateMachina){}
}

class NegativeState implements IState {
  OnEnterActions: IAction[] = []
  OnUpdateActions: IAction[] = []
  OnExitActions: IAction[] = []
  Transitions: ITransition[] = []

  constructor(private readonly _stateMachina: TestStateMachina){}
}

export class InitToPositive implements ITransition {
  public TrueCondition = new TestTrueCondition(this._stateMachina.Owner)
  public FalseCondition = null

  public get Target(): PositiveState {
    return this._stateMachina.States.find(s => s instanceof PositiveState) as PositiveState
  }

  constructor(private readonly _stateMachina: TestStateMachina){}
}

export class InitToNegative implements ITransition {
  public TrueCondition = null
  public FalseCondition = new TestFalseCondition(this._stateMachina.Owner)

  public get Target(): NegativeState {
    return this._stateMachina.States.find(s => s instanceof NegativeState) as NegativeState
  }

  constructor(private readonly _stateMachina: TestStateMachina){}
}

export class TestTrueCondition implements ICondition {
  constructor(private _owner: ITestOwner){}

  public Check(): boolean {
    return this._owner.Parameter === true
  }
}

export class TestFalseCondition implements ICondition {
  constructor(private _owner: ITestOwner){}

  public Check(): boolean {
    return !(this._owner.Parameter === false)
  }
}


describe('State Machina', () => {
  const deltaTime1 = 100
  const deltaTime2 = 200
  const deltaTime3 = 300

  const initStateOnEnterAction1 = new Action()
  const initStateOnEnterAction2 = new Action()
  const initStateOnUpdateAction1 = new Action()
  const initStateOnUpdateAction2 = new Action()
  const initStateOnExitAction1 = new Action()
  const initStateOnExitAction2 = new Action()

  const positiveStateOnEnterAction1 = new Action()
  const positiveStateOnEnterAction2 = new Action()
  const positiveStateOnUpdateAction1 = new Action()
  const positiveStateOnUpdateAction2 = new Action()
  const positiveStateOnExitAction1 = new Action()
  const positiveStateOnExitAction2 = new Action()

  const negativeStateOnEnterAction1 = new Action()
  const negativeStateOnEnterAction2 = new Action()
  const negativeStateOnUpdateAction1 = new Action()
  const negativeStateOnUpdateAction2 = new Action()
  const negativeStateOnExitAction1 = new Action()
  const negativeStateOnExitAction2 = new Action()

  let owner: ITestOwner = { }
  let stateMachina: TestStateMachina
  let initState: IState
  let positiveState: IState
  let negativeState: IState

  let spyInitStateOnEnterAction1: jest.SpyInstance<void, [number]>
  let spyInitStateOnEnterAction2: jest.SpyInstance<void, [number]>
  let spyInitStateOnUpdateAction1: jest.SpyInstance<void, [number]>
  let spyInitStateOnUpdateAction2: jest.SpyInstance<void, [number]>
  let spyInitStateOnExitAction1: jest.SpyInstance<void, [number]>
  let spyInitStateOnExitAction2: jest.SpyInstance<void, [number]>

  let spyPositiveStateOnEnterAction1: jest.SpyInstance<void, [number]>
  let spyPositiveStateOnEnterAction2: jest.SpyInstance<void, [number]>
  let spyPositiveStateOnUpdateAction1: jest.SpyInstance<void, [number]>
  let spyPositiveStateOnUpdateAction2: jest.SpyInstance<void, [number]>
  let spyPositiveStateOnExitAction1: jest.SpyInstance<void, [number]>
  let spyPositiveStateOnExitAction2: jest.SpyInstance<void, [number]>

  let spyNegativeStateOnEnterAction1: jest.SpyInstance<void, [number]>
  let spyNegativeStateOnEnterAction2: jest.SpyInstance<void, [number]>
  let spyNegativeStateOnUpdateAction1: jest.SpyInstance<void, [number]>
  let spyNegativeStateOnUpdateAction2: jest.SpyInstance<void, [number]>
  let spyNegativeStateOnExitAction1: jest.SpyInstance<void, [number]>
  let spyNegativeStateOnExitAction2: jest.SpyInstance<void, [number]>

  beforeEach(() => {
    owner = {}
    stateMachina = new TestStateMachina(owner)

    initState = new InitState(stateMachina)
    positiveState = new PositiveState(stateMachina)
    negativeState = new NegativeState(stateMachina)

    initState.OnEnterActions = [initStateOnEnterAction1, initStateOnEnterAction2]
    initState.OnUpdateActions = [initStateOnUpdateAction1, initStateOnUpdateAction2]
    initState.OnExitActions = [initStateOnExitAction1, initStateOnExitAction2]

    positiveState.OnEnterActions = [positiveStateOnEnterAction1, positiveStateOnEnterAction2]
    positiveState.OnUpdateActions = [positiveStateOnUpdateAction1, positiveStateOnUpdateAction2]
    positiveState.OnExitActions = [positiveStateOnExitAction1, positiveStateOnExitAction2]

    negativeState.OnEnterActions = [negativeStateOnEnterAction1, negativeStateOnEnterAction2]
    negativeState.OnUpdateActions = [negativeStateOnUpdateAction1, negativeStateOnUpdateAction2]
    negativeState.OnExitActions = [negativeStateOnExitAction1, negativeStateOnExitAction2]

    spyInitStateOnEnterAction1 = jest.spyOn(initStateOnEnterAction1, 'Execute')
    spyInitStateOnEnterAction2 = jest.spyOn(initStateOnEnterAction2, 'Execute')
    spyInitStateOnUpdateAction1 = jest.spyOn(initStateOnUpdateAction1, 'Execute')
    spyInitStateOnUpdateAction2 = jest.spyOn(initStateOnUpdateAction2, 'Execute')
    spyInitStateOnExitAction1 = jest.spyOn(initStateOnExitAction1, 'Execute')
    spyInitStateOnExitAction2 = jest.spyOn(initStateOnExitAction2, 'Execute')

    spyPositiveStateOnEnterAction1 = jest.spyOn(positiveStateOnEnterAction1, 'Execute')
    spyPositiveStateOnEnterAction2 = jest.spyOn(positiveStateOnEnterAction2, 'Execute')
    spyPositiveStateOnUpdateAction1 = jest.spyOn(positiveStateOnUpdateAction1, 'Execute')
    spyPositiveStateOnUpdateAction2 = jest.spyOn(positiveStateOnUpdateAction2, 'Execute')
    spyPositiveStateOnExitAction1 = jest.spyOn(positiveStateOnExitAction1, 'Execute')
    spyPositiveStateOnExitAction2 = jest.spyOn(positiveStateOnExitAction2, 'Execute')

    spyNegativeStateOnEnterAction1 = jest.spyOn(negativeStateOnEnterAction1, 'Execute')
    spyNegativeStateOnEnterAction2 = jest.spyOn(negativeStateOnEnterAction2, 'Execute')
    spyNegativeStateOnUpdateAction1 = jest.spyOn(negativeStateOnUpdateAction1, 'Execute')
    spyNegativeStateOnUpdateAction2 = jest.spyOn(negativeStateOnUpdateAction2, 'Execute')
    spyNegativeStateOnExitAction1 = jest.spyOn(negativeStateOnExitAction1, 'Execute')
    spyNegativeStateOnExitAction2 = jest.spyOn(negativeStateOnExitAction2, 'Execute')

    stateMachina.SetStates([initState, positiveState, negativeState], initState)
  })

  it('should do nothing until started', () => {
    expect(spyInitStateOnEnterAction1).not.toBeCalled()
    expect(spyInitStateOnEnterAction2).not.toBeCalled()
    expect(spyInitStateOnUpdateAction1).not.toBeCalled()
    expect(spyInitStateOnUpdateAction2).not.toBeCalled()
    expect(spyInitStateOnExitAction1).not.toBeCalled()
    expect(spyInitStateOnExitAction2).not.toBeCalled()

    expect(spyPositiveStateOnEnterAction1).not.toBeCalled()
    expect(spyPositiveStateOnEnterAction2).not.toBeCalled()
    expect(spyPositiveStateOnUpdateAction1).not.toBeCalled()
    expect(spyPositiveStateOnUpdateAction2).not.toBeCalled()
    expect(spyPositiveStateOnExitAction1).not.toBeCalled()
    expect(spyPositiveStateOnExitAction2).not.toBeCalled()

    expect(spyNegativeStateOnEnterAction1).not.toBeCalled()
    expect(spyNegativeStateOnEnterAction2).not.toBeCalled()
    expect(spyNegativeStateOnUpdateAction1).not.toBeCalled()
    expect(spyNegativeStateOnUpdateAction2).not.toBeCalled()
    expect(spyNegativeStateOnExitAction1).not.toBeCalled()
    expect(spyNegativeStateOnExitAction2).not.toBeCalled()
  })

  it('should do nothing if paused', () => {
    stateMachina.Start()

    spyInitStateOnEnterAction1.mockClear()
    spyInitStateOnEnterAction2.mockClear()

    stateMachina.Pause()

    stateMachina.Update(deltaTime1)

    expect(spyInitStateOnEnterAction1).not.toBeCalled()
    expect(spyInitStateOnEnterAction2).not.toBeCalled()
    expect(spyInitStateOnUpdateAction1).not.toBeCalled()
    expect(spyInitStateOnUpdateAction2).not.toBeCalled()
    expect(spyInitStateOnExitAction1).not.toBeCalled()
    expect(spyInitStateOnExitAction2).not.toBeCalled()
  })

  it('should execute every OnEnterActions when started but nothing else', () => {
    stateMachina.Start()

    expect(spyInitStateOnEnterAction1).toBeCalledTimes(1)
    expect(spyInitStateOnEnterAction2).toBeCalledTimes(1)
    expect(spyInitStateOnUpdateAction1).not.toBeCalled()
    expect(spyInitStateOnUpdateAction2).not.toBeCalled()
    expect(spyInitStateOnExitAction1).not.toBeCalled()
    expect(spyInitStateOnExitAction2).not.toBeCalled()
  })

  it('should execute every OnUpdateAction on every Update but nothing else', () => {
    stateMachina.Start()

    spyInitStateOnEnterAction1.mockClear()
    spyInitStateOnEnterAction2.mockClear()

    stateMachina.Update(deltaTime1)

    expect(spyInitStateOnEnterAction1).not.toBeCalled()
    expect(spyInitStateOnEnterAction2).not.toBeCalled()
    expect(spyInitStateOnUpdateAction1).toBeCalledTimes(1)
    expect(spyInitStateOnUpdateAction2).toBeCalledTimes(1)
    expect(spyInitStateOnUpdateAction1).toBeCalledWith(deltaTime1)
    expect(spyInitStateOnUpdateAction2).toBeCalledWith(deltaTime1)
    expect(spyInitStateOnExitAction1).not.toBeCalled()
    expect(spyInitStateOnExitAction2).not.toBeCalled()

    stateMachina.Update(deltaTime2)

    expect(spyInitStateOnEnterAction1).not.toBeCalled()
    expect(spyInitStateOnEnterAction2).not.toBeCalled()
    expect(spyInitStateOnUpdateAction1).toBeCalledTimes(2)
    expect(spyInitStateOnUpdateAction2).toBeCalledTimes(2)
    expect(spyInitStateOnUpdateAction1).toBeCalledWith(deltaTime2)
    expect(spyInitStateOnUpdateAction2).toBeCalledWith(deltaTime2)
    expect(spyInitStateOnExitAction1).not.toBeCalled()
    expect(spyInitStateOnExitAction2).not.toBeCalled()
  })

  it('should execute every OnExitAction before transition to the next state', () => {
    stateMachina.Start()

    spyInitStateOnEnterAction1.mockClear()
    spyInitStateOnEnterAction2.mockClear()

    expect(stateMachina.Current).toBeInstanceOf(InitState)

    // trigger transition
    owner.Parameter = true

    stateMachina.Update(deltaTime1)

    expect(spyInitStateOnEnterAction1).not.toBeCalled()
    expect(spyInitStateOnEnterAction2).not.toBeCalled()
    expect(spyInitStateOnUpdateAction1).not.toBeCalled()
    expect(spyInitStateOnUpdateAction2).not.toBeCalled()
    expect(spyInitStateOnExitAction1).toBeCalledTimes(1)
    expect(spyInitStateOnExitAction2).toBeCalledTimes(1)
  })

  it('should transition to the Positive state when positive condition is positive', () => {
    stateMachina.Start()

    // trigger transition
    owner.Parameter = true

    stateMachina.Update(deltaTime1)

    expect(spyPositiveStateOnEnterAction1).toBeCalledTimes(1)
    expect(spyPositiveStateOnEnterAction2).toBeCalledTimes(1)

    expect(stateMachina.Current).toBeInstanceOf(PositiveState)
  })

  it('should transition to Negative State when FalseCondition is negative', () => {
    stateMachina.Start()

    expect(stateMachina.Current).toBeInstanceOf(InitState)

    spyInitStateOnEnterAction1.mockClear()
    spyInitStateOnEnterAction2.mockClear()

    // trigger transition to Negative
    owner.Parameter = false

    stateMachina.Update(deltaTime1)

    expect(spyNegativeStateOnEnterAction1).toBeCalledTimes(1)
    expect(spyNegativeStateOnEnterAction2).toBeCalledTimes(1)

    expect(stateMachina.Current).toBeInstanceOf(NegativeState)
  })

  it('should call OnUpdateActions of the new state immediately after transition', () => {
    stateMachina.Start()

    // trigger transition
    owner.Parameter = true

    stateMachina.Update(deltaTime1)

    expect(spyPositiveStateOnUpdateAction1).toBeCalledWith(deltaTime1)
    expect(spyPositiveStateOnUpdateAction2).toBeCalledWith(deltaTime1)
  })

  it('should call OnUpdateActions of the new state from now on', () => {
    stateMachina.Start()

    owner.Parameter = true
    stateMachina.Update(deltaTime1)

    spyInitStateOnEnterAction1.mockClear()
    spyInitStateOnEnterAction2.mockClear()
    spyInitStateOnUpdateAction1.mockClear()
    spyInitStateOnUpdateAction2.mockClear()
    spyInitStateOnExitAction1.mockClear()
    spyInitStateOnExitAction2.mockClear()

    spyPositiveStateOnEnterAction1.mockClear()
    spyPositiveStateOnEnterAction2.mockClear()
    spyPositiveStateOnUpdateAction1.mockClear()
    spyPositiveStateOnUpdateAction2.mockClear()

    // next Updates happen only in the new state
    stateMachina.Update(deltaTime2)
    expect(spyPositiveStateOnEnterAction1).not.toBeCalled()
    expect(spyPositiveStateOnEnterAction2).not.toBeCalled()
    expect(spyPositiveStateOnUpdateAction1).toBeCalledTimes(1)
    expect(spyPositiveStateOnUpdateAction2).toBeCalledTimes(1)
    expect(spyPositiveStateOnUpdateAction1).toBeCalledWith(deltaTime2)
    expect(spyPositiveStateOnUpdateAction2).toBeCalledWith(deltaTime2)
    expect(spyPositiveStateOnExitAction1).not.toBeCalled()
    expect(spyPositiveStateOnExitAction2).not.toBeCalled()

    expect(spyInitStateOnEnterAction1).not.toBeCalled()
    expect(spyInitStateOnEnterAction2).not.toBeCalled()
    expect(spyInitStateOnUpdateAction1).not.toBeCalled()
    expect(spyInitStateOnUpdateAction2).not.toBeCalled()
    expect(spyInitStateOnExitAction1).not.toBeCalled()
    expect(spyInitStateOnExitAction2).not.toBeCalled()

    spyPositiveStateOnUpdateAction1.mockClear()
    spyPositiveStateOnUpdateAction2.mockClear()

    stateMachina.Update(deltaTime3)
    expect(spyPositiveStateOnEnterAction1).not.toBeCalled()
    expect(spyPositiveStateOnEnterAction2).not.toBeCalled()
    expect(spyPositiveStateOnUpdateAction1).toBeCalledTimes(1)
    expect(spyPositiveStateOnUpdateAction2).toBeCalledTimes(1)
    expect(spyPositiveStateOnUpdateAction1).toBeCalledWith(deltaTime3)
    expect(spyPositiveStateOnUpdateAction2).toBeCalledWith(deltaTime3)
    expect(spyPositiveStateOnExitAction1).not.toBeCalled()
    expect(spyPositiveStateOnExitAction2).not.toBeCalled()

    expect(spyInitStateOnEnterAction1).not.toBeCalled()
    expect(spyInitStateOnEnterAction2).not.toBeCalled()
    expect(spyInitStateOnUpdateAction1).not.toBeCalled()
    expect(spyInitStateOnUpdateAction2).not.toBeCalled()
    expect(spyInitStateOnExitAction1).not.toBeCalled()
    expect(spyInitStateOnExitAction2).not.toBeCalled()
  })
})
