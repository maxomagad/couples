class Card {
  _open = false
  _success = false
  //создание карточки
  constructor(container, number, action) {
    this.card = document.createElement('div')
    this.card.classList.add('card')
    this.card.textContent = number
    this.number = number
    //изменение состояний open & success
    this.card.addEventListener('click', () => {
      if (this.open == false && this.success == false) {
        this.open = true
        action(this)
      }
    })
    container.append(this.card)
  }
  //сетторы гетторы на изменение состояний open & success
  set open(value) {
    this._open = value
    value ? this.card.classList.add('open') : this.card.classList.remove('open')
  }
  get open() {
    return this._open
  }
  set success(value) {
    this._success = value
    value ? this.card.classList.add('success') : this.card.classList.remove('success')
  }
  get success() {
    return this._success
  }
}

export { Card };
