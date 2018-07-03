# Calendar

Vanilla Javascript calendar   

## Demo
[https://slawomirjopek.github.io/calendar/](https://slawomirjopek.github.io/calendar/)

### Installing

Grab the compiled JS/CSS from the /dist directory, load them into your web page, and everything should work!

## Using calendar

```
new Calendar(options: obj);
```

### Options
```
target: DOM Node   // *required - container where calendar will be created
onLoad: Function   // callback function executed when calendar will build
onGridChange: Function   // callback function executed every time grid will be updated
onSelect: Function   // callback function executed when day be clicked
days: Array   // must contain exactly seven strings representing days
months: Array   // must contain exactly twelve strings representing months
```

### Example
Look at: example/index.html

## Versioning

For the versions available, see the [tags on calendar](https://github.com/slawomirjopek/calendar/tags). 

## Authors

* **Sławomir Jopek** - [slawomirjopek](https://github.com/slawomirjopek)

## License

This project is licensed under the MIT License
