import _ from 'lodash'

export const ARRAY_PLACEHOLDER = '<%ARRAY_PLACEHOLDER%> elements equal'

function diffValue (obj1Value, obj2Value) {
  if (_.isArray(obj1Value) && _.isArray(obj2Value)) {
    return diffArray(obj1Value, obj2Value)
  } else if (_.isObject(obj1Value) && _.isObject(obj2Value)) {
    return diffObject(obj1Value, obj2Value)
  } else if (!_.isEqual(obj1Value, obj2Value)) {
    return {
      differentKeys: [undefined],
      leftOnlyKeys: [],
      rightOnlyKeys: [],
      leftDiff: obj1Value,
      rightDiff: obj2Value
    }
  }
  return {
    differentKeys: [],
    leftOnlyKeys: [],
    rightOnlyKeys: []
  }
}
function completePath (key, nextKey) {
  if (nextKey === undefined) {
    return key
  }
  return `${key}.${nextKey}`
}
function diffArray (obj1Value, obj2Value) {
  const leftDiff = []
  const rightDiff = []
  const differentKeys = []
  const rightOnlyKeys = []
  const leftOnlyKeys = []

  let length = Math.min(obj1Value.length, obj2Value.length)
  let i
  for (i = 0; i < length; ++i) {
    const result = diffValue(obj1Value[i], obj2Value[i])
    const completeIndexPath = _.partial(completePath, i)
    let hasMinusDiff = false
    let hasRightDiff = false

    if (result.leftOnlyKeys.length > 0) {
      leftOnlyKeys.push.apply(leftOnlyKeys, _.map(result.leftOnlyKeys, completeIndexPath))
      if (!_.isEmpty(result.leftDiff)) {
        leftDiff.push(result.leftDiff)
        hasMinusDiff = true
      }
    }

    if (result.rightOnlyKeys.length > 0) {
      rightOnlyKeys.push.apply(rightOnlyKeys, _.map(result.rightOnlyKeys, completeIndexPath))
      if (!_.isEmpty(result.rightDiff)) {
        rightDiff.push(result.rightDiff)
        hasRightDiff = true
      }
    }
    if (result.differentKeys.length > 0) {
      differentKeys.push.apply(differentKeys, _.map(result.differentKeys, completeIndexPath))
      leftDiff.push(result.leftDiff)
      rightDiff.push(result.rightDiff)
      hasMinusDiff = true
      hasRightDiff = true
    }
    if (!hasMinusDiff) {
      leftDiff.push(ARRAY_PLACEHOLDER)
    }
    if (!hasRightDiff) {
      rightDiff.push(ARRAY_PLACEHOLDER)
    }
  }

  if (obj1Value.length >= obj2Value.length) {
    length = obj2Value.length
    let i
    for (i = length; i < obj1Value.length; ++i) {
      leftOnlyKeys.push(i)
      leftDiff.push(obj1Value[i])
    }
  } else if (obj1Value.length < obj2Value.length) {
    length = obj1Value.length
    let i
    for (i = length; i < obj2Value.length; ++i) {
      rightOnlyKeys.push(i)
      rightDiff.push(obj2Value[i])
    }
  }

  return {
    differentKeys,
    leftOnlyKeys,
    leftDiff,
    rightOnlyKeys,
    rightDiff
  }
}

export default function diffObject (obj1, obj2) {
  const obj1Keys = _.keys(obj1)
  const obj2Keys = _.keys(obj2)

  const rightOnlyKeys = _.reject(obj2Keys, _.partial(_.includes, obj1Keys))
  const leftOnlyKeys = _.reject(obj1Keys, _.partial(_.includes, obj2Keys))
  const commonKeys = _.intersection(obj1Keys, obj2Keys)

  const leftDiff = {}

  _.each(leftOnlyKeys, function (key) {
    leftDiff[key] = _.cloneDeep(obj1[key])
  })

  const rightDiff = {}

  _.each(rightOnlyKeys, function (key) {
    rightDiff[key] = _.cloneDeep(obj2[key])
  })

  const differentKeyList = []

  _.each(commonKeys, function (key) {
    const obj1Value = obj1[key]
    const obj2Value = obj2[key]
    const completeKeyPath = _.partial(completePath, key)

    if (_.isArray(obj1Value) && _.isArray(obj2Value)) {
      const result = diffArray(obj1Value, obj2Value)
      if (result.differentKeys.length > 0) {
        differentKeyList.push(_.map(result.differentKeys, completeKeyPath))
        leftDiff[key] = result.leftDiff
        rightDiff[key] = result.rightDiff
      }

      if (result.leftOnlyKeys.length > 0) {
        leftOnlyKeys.push.apply(leftOnlyKeys, _.map(result.leftOnlyKeys, completeKeyPath))
        if (!_.isEmpty(result.leftDiff)) {
          leftDiff[key] = result.leftDiff
        }
      }

      if (result.rightOnlyKeys.length > 0) {
        rightOnlyKeys.push.apply(rightOnlyKeys, _.map(result.rightOnlyKeys, completeKeyPath))
        if (!_.isEmpty(result.rightDiff)) {
          rightDiff[key] = result.rightDiff
        }
      }
    } else if (_.isObject(obj1Value) && _.isObject(obj2Value)) {
      const result = diffObject(obj1Value, obj2Value)
      if (result.differentKeys.length > 0) {
        differentKeyList.push(_.map(result.differentKeys, completeKeyPath))
        leftDiff[key] = result.leftDiff
        rightDiff[key] = result.rightDiff
      }

      if (result.leftOnlyKeys.length > 0) {
        leftOnlyKeys.push.apply(leftOnlyKeys, _.map(result.leftOnlyKeys, completeKeyPath))
        if (!_.isEmpty(result.leftDiff)) {
          leftDiff[key] = result.leftDiff
        }
      }

      if (result.rightOnlyKeys.length > 0) {
        rightOnlyKeys.push.apply(rightOnlyKeys, _.map(result.rightOnlyKeys, completeKeyPath))
        if (!_.isEmpty(result.rightDiff)) {
          rightDiff[key] = result.rightDiff
        }
      }
    } else if (!_.isEqual(obj1Value, obj2Value)) {
      leftDiff[key] = obj1Value
      rightDiff[key] = obj2Value
      differentKeyList.push(key)
    }
  })

  return {
    differentKeys: _.flatten(differentKeyList),
    rightOnlyKeys,
    leftOnlyKeys,
    rightDiff,
    leftDiff
  }
}
