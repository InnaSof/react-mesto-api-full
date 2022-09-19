function _getHeaders(){
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
  }
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  } 

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: _getHeaders(),
    })
    .then(this._handleResponse);
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: _getHeaders(),
    })
    .then(this._handleResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: _getHeaders(),
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._handleResponse);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: _getHeaders(),
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._handleResponse);
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: _getHeaders(),
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: _getHeaders(),
    })
    .then(this._handleResponse);
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: _getHeaders(),
    })
    .then(this._handleResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: _getHeaders(),
    })
    .then(this._handleResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.practicum.nomoredomains.sbs/'
});

export default api;