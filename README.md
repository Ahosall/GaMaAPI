<div id="top" align="center">
  <h1>GaMaBOT - API</h1>
  <p>Manual de requisições da API do GaMaBOT.</p>
</div>

## Guia

- <a href="#queue">Queue</a>
- <a href="#music">Música</a>
- <a href="#utils">Utilitários</a>

## Rotas

> **Atenção**
>
> Obrigatório informar o(s) parametro(s) e/ou a(s) query(s).

<h3 id="queue">Queue</h3>

- Criar Queue

  ```YML
  path: /api/queue/<SERVER-ID>/
  method: POST
  params:
    - <SERVER-ID> - Id do servidor onde o bot irá fazer a requisição.
  querys:
    - ?key - A chave do vídeo do Yotube (Após o "watch?v=" sem o "&list=")
    - ?playlist - Adiciona uma playlist (Após o "playlist?list=")
  ```

  > Ex. (python)
  >
  > ```py
  > # Add music
  > requests.post(api+f'/queue/{serverId}/?key=XeUiJJN0vsE')
  > # Add pLaylist
  > requests.post(api+f'/queue/{serverId}/?> playlist=PLlBnICoI-g-d-J57QIz6Tx5xtUDGQdBFB')
  > ```

- Buscar Queue

  ```YML
  path: /api/queue/<SERVER-ID>/
  method: GET
  params:
    - <SERVER-ID> - Id do servidor onde o bot irá fazer a requisição.
  ```

  > Ex. (python)
  >
  > ```py
  > # Get queue
  > requests.get(api+f'/queue/{serverId}/')
  > ```

- Limpar Queue

  ```YML
  path: /api/queue/<SERVER-ID>/
  method: DELETE
  params:
    - <SERVER-ID> - Id do servidor onde o bot irá fazer a requisição.
  ```

  > Ex. (python)
  >
  > ```py
  > # Clean queue
  > requests.delete(api+f'/queue/{serverId}/')
  > ```

<h3 id="music">Música</h3>

- Buscar música

  ```YML
  path: /api/music/
  method: GET
  querys:
    - ?key - A chave do vídeo do Yotube (Após o "watch?v=" sem o "&list=")
  ```

  > Ex. (python)
  >
  > ```py
  > # Get music
  > requests.post(api+f'/music/?pos=2')
  > ```

<h3 id="utils">Utilitários</h3>

> **OBS**
>
> As querys aqui não são obrigatórias!

- Skip

  ```YML
  path: /api/queue/<SERVER-ID>/skip
  method: POST
  querys:
    - ?pos - Um número inteiro
  ```

  > Ex. (python)
  >
  > ```py
  > # Skip music
  > requests.post(api+f'/music/?pos=2') # Pula para segunda música
  > ```

- Back

  ```YML
  path: /api/queue/<SERVER-ID>/back
  method: POST
  querys:
    - ?pos - Um número inteiro
  ```

  > Ex. (python)
  >
  > ```py
  > # Back music
  > requests.post(api+f'/music/?pos=2') # Volta duas músicas
  > ```

<div align="center">
  <hr/>
  <p>Made with 🤍 by <a href="https://github.com/Ahosall"><b>Ahosall</b></a>!</p>
  <br>
  <a href="#top"><b>⬆</b></a>
</div>
