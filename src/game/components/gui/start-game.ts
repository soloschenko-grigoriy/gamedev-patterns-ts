import { IComponent } from '@/utils'
import { Game } from '../../game'

export class StartGameUI implements IComponent {
  public Entity: Game

  private _templateSelector = '#start-ui'
  private _elm : HTMLDivElement

  constructor(private readonly _container: HTMLElement) {}

  public Awake(): void {
    // this.RenderTemplate()
    // this.Hide()
  }

  public Update(deltaTime: number): void {
    // @todo
  }

  private RenderTemplate() : void {
    const template = document.querySelector<HTMLTemplateElement>(this._templateSelector)
    if(!template){
      throw new Error(`Could not locate template by ${this._templateSelector} selector`)
    }

    const content = template?.content

    this._elm = document.createElement('div')
    this._elm.appendChild(content)

    this._container.appendChild(this._elm)
  }

  private Show() : void {
    this._elm.style.display = 'block'
  }

  private Hide() : void {
    this._elm.style.display = 'none'
  }
}
