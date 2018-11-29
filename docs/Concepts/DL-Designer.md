---
title: DL Designer
videoURL: https://www.youtube.com/watch?v=8lR9scOLE7U
desc: Razorthink AI Blocks are the fundemental units that carry out a specialized operation. Every block has a well defined input, output and parameters.
---

# DL Designer

Razorthink AI Blocks are the fundemental units that carry out a specialized operation. Every block has a well defined input, output and parameters. Input (one or more) is usually a stream of data from a datasource such as HDFS, MySQL or even cloud storage such as Google Drive or Dropbox. Output of a block is also usually a stream of data that can flow into another block as input or to a destination such any datasource metioned earlier.

[[toc]]

## Block Inputs
Every block has a well defined input, output and parameters. Input (one or more) is usually a stream of data from a datasource such as HDFS, MySQL or even cloud storage such as Google Drive or Dropbox.

## Block Output
Output of a block is also usually a stream of data that can flow into another block as input or to a destination such any datasource metioned earlier.

## Block Parameters
A block can receive one or more parameters either dynamically during runtime or static during design. 
The following types or parameters are supported out-of-the-box:

|**Type**|**Description**|
|--|--|
|**String**| String based inputs such column names etc. |
|**Number**| Numeric inputs that are either `ints` or `floats` |
|**Code**| Block of code that could be executed by the block |
|**Function**| A lambda that performs a simple transformation |




## Creating a new block
Razorthink AI provides easy to use Python SDK that you can use to create your own block. Inherit from `StreamBlock` or `BatchBlock` and implement `run` method. A block can either stream data or produce a static JSON as its output.

### Simple block example

```python
from blocks import Block, StreamBlock, BatchBlock, Parameters as Params

@Params.String('column', info='Column name to add number to', required=True)  
@Params.Number('number', info='Number to add to column', min=0, max=10)  
@Params.Group('grouped_fields', [Params.String('field1'), Params.Number('field2')], repeatable=True)  
class AddNumber(StreamBlock):  
    def run(self, data, column, number, **params):  
        data[column] = int(data[column]) + number  
        return data
```

### Batch block example
```python
class AddNumbers(BatchBlock):
    def subscribe_inputs(self, input_, **params):
        return [input_['name']]

    def register_outputs(self, output_, schema, input_, **params):
        output_schema = schema[input_['name']]
        output_schema.add('Hyped_transaction')
        output_schema.remove('Item')
        return {output_['name']: output_schema}

    def run(self, data_gen, schema, input_, output_, column, **params):
        for data in data_gen[input_['name']]:
            data['Hyped_transaction'] = data[column['name']] + 100
            yield data, self.output(output_['name'])
```

::: tip
Note that a Batch block can also stream output if `yield` is used instead of `return` in the `run` method.
::: 
