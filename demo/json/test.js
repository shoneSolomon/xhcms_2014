<%=request.data.callback%>({
    "code": 200,
    "totalCount": <%=request.data.totalPage || 30%>,
    "pageSize" : 15,
    "currentPage": <%=request.data.toPage || 1%>,
    "data":[
        {
            "name":"shy2850",
            "age" : 25,
            "sex" : true,
            "birth" : "2013-5-4",
            "template" : 1
        },
        {
            "name":"shy2850",
            "age" : 25,
            "sex" : true,
            "birth" : "2013-5-4",
            "template" : 3
        },
        {
            "name":"shy2850",
            "age" : 25,
            "sex" : true,
            "birth" : "2013-5-4",
            "template" : 1
        },
        {
            "name":"shy2850",
            "age" : 25,
            "sex" : true,
            "birth" : "2013-5-4",
            "template" : 2
        },
        {
            "name":"shy2850",
            "age" : 25,
            "sex" : true,
            "birth" : "2013-5-4",
            "template" : 2
        },
        {
            "name":"shy2850",
            "age" : 25,
            "sex" : true,
            "birth" : "2013-5-4",
            "template" : 1
        },
        {
            "name":"shy2850",
            "age" : 25,
            "sex" : true,
            "birth" : "2013-5-4",
            "template" : 3
        }
    ]
});