export default {
  stylish: `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
  plain: `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
  diff: [
    {
      key: 'common',
      status: 'equal',
      value: null,
      children: [
        { key: 'follow', status: 'added', value: false },
        { key: 'setting1', status: 'equal', value: 'Value 1' },
        { key: 'setting2', status: 'removed', value: 200 },
        {
          key: 'setting3',
          status: 'updated',
          value: null,
          previousValue: true,
        },
        { key: 'setting4', status: 'added', value: 'blah blah' },
        { key: 'setting5', status: 'added', value: { key5: 'value5' } },
        {
          key: 'setting6',
          status: 'equal',
          value: null,
          children: [
            {
              key: 'doge',
              status: 'equal',
              value: null,
              children: [{
                key: 'wow', status: 'updated', value: 'so much', previousValue: '',
              }],
            },
            { key: 'key', status: 'equal', value: 'value' },
            { key: 'ops', status: 'added', value: 'vops' },
          ],
        },
      ],
    },
    {
      key: 'group1',
      status: 'equal',
      value: null,
      children: [
        {
          key: 'baz', status: 'updated', value: 'bars', previousValue: 'bas',
        },
        { key: 'foo', status: 'equal', value: 'bar' },
        {
          key: 'nest', status: 'updated', value: 'str', previousValue: { key: 'value' },
        },
      ],
    },
    { key: 'group2', status: 'removed', value: { abc: 12345, deep: { id: 45 } } },
    { key: 'group3', status: 'added', value: { deep: { id: { number: 45 } }, fee: 100500 } },
  ],
  json: `[
  {
    "key": "common",
    "status": "equal",
    "value": null,
    "children": [
      {
        "key": "follow",
        "status": "added",
        "value": false
      },
      {
        "key": "setting1",
        "status": "equal",
        "value": "Value 1"
      },
      {
        "key": "setting2",
        "status": "removed",
        "value": 200
      },
      {
        "key": "setting3",
        "status": "updated",
        "value": null,
        "previousValue": true
      },
      {
        "key": "setting4",
        "status": "added",
        "value": "blah blah"
      },
      {
        "key": "setting5",
        "status": "added",
        "value": {
          "key5": "value5"
        }
      },
      {
        "key": "setting6",
        "status": "equal",
        "value": null,
        "children": [
          {
            "key": "doge",
            "status": "equal",
            "value": null,
            "children": [
              {
                "key": "wow",
                "status": "updated",
                "value": "so much",
                "previousValue": ""
              }
            ]
          },
          {
            "key": "key",
            "status": "equal",
            "value": "value"
          },
          {
            "key": "ops",
            "status": "added",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "key": "group1",
    "status": "equal",
    "value": null,
    "children": [
      {
        "key": "baz",
        "status": "updated",
        "value": "bars",
        "previousValue": "bas"
      },
      {
        "key": "foo",
        "status": "equal",
        "value": "bar"
      },
      {
        "key": "nest",
        "status": "updated",
        "value": "str",
        "previousValue": {
          "key": "value"
        }
      }
    ]
  },
  {
    "key": "group2",
    "status": "removed",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "key": "group3",
    "status": "added",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]`,
};
