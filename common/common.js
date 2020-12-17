module.exports = {
    response: function (status, message = null, total_records = null, data = []) {
        return {
            'meta': {
                'code': status,
                'message': message,
            },
            'total_records': total_records,
            'data': data,
        }
    },
    errorRespone: function (status, message = null, data = []) {
        var error_array = {};
        data.map(element => { error_array[element.param] = element.msg; });
        return {
            'meta': {
                'code': status,
                'message': message,
            },
            'data': error_array,
        }
    }
}