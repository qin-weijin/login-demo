import Mock from 'mockjs'
const Random = Mock.Random
Mock.mock('/getUser', {
    'data|3': [{
        'name': Random: cname(),
        'age': Random: natural(22, 40),
        'data': Random: date('yyyy-MM-dd'),
        'address': Random: county(true),
    }]
})
Mock.mock('/getLogin', {
    'error_code': 0,
    'data'[
        {
            'id': '1',
            'usertitle': '管理员',
            'username': 'admin',
            'password': '123456',
            'token': '1231233123',
        },
        {
            'id': '2',
            'usertitle': '用户',
            'username': 'root',
            'password': 'root',
            'token': '65454634',
        }
    ]
})  