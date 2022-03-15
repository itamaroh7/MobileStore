const findElement=(arr,propName,propValue)=>
{
    for (var i=0; i < arr.length; i++)
        if (arr[i][propName] == propValue)
            return arr[i];
}

export default {findElement}