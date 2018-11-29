# dropdown-select

A group of dropdown select controls for React JS.

### Demo

Live Demo:
[https://ganapathy888.github.io/dropdown-select]('https://ganapathy888.github.io/dropdown-select')

### Examples

[Browse Examples](examples)

### Features

* Multi Select
* Async Select
* Auto Complete
* Minimal Interface
* Can Control using Keyboard
* Works with [redux-form](https://github.com/erikras/redux-form/)

### Installation

Add package using Yarn or Npm.

```sh
yarn add dropdown-select
```

```sh
npm install dropdown-select
```

### Usage

Import dropdown select controls and its styles into your component.

```js
import { Select, AsyncSelect, MultiSelect } from 'dropdown-select';
import 'dropdown-select/dist/css/dropdown-select.css';
```

Alternatively, you can import the styles from `.scss` files as follows:

```scss
@import '~dropdown-select/dist/css/dropdown-select.css';
```

**Simple Select:** (with array of string options)

```jsx
<Select
  options={['option1', 'option2', ...]}
  />
```

**Simple Select:** (with array of object options)

```jsx
options = [
  {
    label: 'label1',
    value: 'value1'
  },
  {
    label: 'label2',
    value: 'value2'
  },
]
<Select options={options} labelKey="label" valueKey="value" />
```

**Async Select:**

```jsx
<AsyncSelect fetchOptions={this.fetchOptions} />
```

**Multi Select:** (Checkboxed Options)

It accepts and returns array of options

```jsx
<MultiSelect options={[]} />
```

---

Using simple select as custom component in **redux-form**

```jsx
renderSelectField({ input, options, meta: { touched, error } }) {
  return (
    <div>
      <SimpleSelect
        {...input}
        options={options}
        labelKey="name"
        valueKey="id"
        />
      {touched && error && <span className="error">{error}</span>}
    </div>
  );
}

render() {
  const { handleSubmit } = this.props
  const options = []

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="fieldName"
        options={options}
        component={this.renderSelectField}
        />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### Functional Properties:

| Property     | Type                    | Default   | Description                                                                                                                   |
| ------------ | ----------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| autoComplete | boolean                 | true      | Enables / Disables auto complete options while typing                                                                         |
| disabled     | boolean                 | false     | To disable the select or not                                                                                                  |
| fetchOptions | function                | undefined | `Async Select` property, the control calls this function when input value changed                                             |
| labelKey     | string                  | undefined | Used to identify the option label                                                                                             |
| options      | array                   | []        | Array of strings (OR) Array of objects                                                                                        |
| onChange     | function                | undefined | Control `onChange` event handler, this function will be called with new option as parameter                                   |
| placeholder  | string / array          | string    | Input placeholder, for `Multi Select` you can pass an array with singular and plural name for items. Eg: ['Person', 'People'] |
| tabIndex     | string                  | undefined | tabIndex of the control                                                                                                       |
| value        | string / object / array | '' or []  | For `Multi` select, the default value is [] and for `Simple` and `Async` select, the default value is empty string            |
| valueKey     | string                  | undefined | Used to identify the option value                                                                                             |

### Style Properties:

| Property         | Type   | Default   | Description                                |
| ---------------- | ------ | --------- | ------------------------------------------ |
| className        | String | undefined | Overrides outer control styles             |
| inputClassName   | String | undefined | Overrides control input styles             |
| optionsClassName | String | undefined | Overrides control options container styles |
| optionClassName  | String | undefined | Overrides control option styles            |

---

### Notes on Performance:

* Use `<Select />` if options length < 200

* Use `<AsyncSelect />` if options length > 200

### Further Reading

For advanced use cases, please refer
[react-select](https://github.com/JedWatson/react-select)
