```javascript
JSON.stringify([...$0.children].map(el => {
  return {
    value: $(el).find('input')[0].value,
    label: $(el).text(),
  }
}), null, 2)
```