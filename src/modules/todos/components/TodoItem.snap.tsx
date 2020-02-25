// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`TodoItem matches snapshot 1`] = `
<Router
  history={
    Object {
      "action": "POP",
      "block": [Function],
      "canGo": [Function],
      "createHref": [Function],
      "entries": Array [
        Object {
          "hash": "",
          "key": "hbis84",
          "pathname": "/",
          "search": "",
          "state": undefined,
        },
      ],
      "go": [Function],
      "goBack": [Function],
      "goForward": [Function],
      "index": 0,
      "length": 1,
      "listen": [Function],
      "location": Object {
        "hash": "",
        "key": "hbis84",
        "pathname": "/",
        "search": "",
        "state": undefined,
      },
      "push": [Function],
      "replace": [Function],
    }
  }
>
  <Memo()
    item={
      Object {
        "data": Object {
          "completed": false,
          "id": 1,
          "text": "Todo 1",
        },
        "request": Object {
          "payload": Object {
            "completed": false,
            "id": 1,
            "text": "Todo 1",
          },
          "state": "success",
          "type": "create",
        },
      }
    }
    onCheckBoxToggle={[MockFunction]}
    onDeleteButtonClick={[MockFunction]}
  />
</Router>
`;
