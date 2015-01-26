炫知相关数据接口
================

前台接口
--------
- SSO相关
	* 登录:
		* pc/m: [http://login.home.news.cn/login.jsp](http://login.home.news.cn/login.jsp)
		* surl: 登录链接添加 回调URL的base64, surl=btoa(http://xuan.news.cn/cloudread/#mytm/20140704/1774014)
	* 注册: (从登录页进入注册不支持surl回调)
		* pc: [http://login.home.news.cn/reg.jsp](http://login.home.news.cn/reg.jsp)
		* m: [`http://login.home.news.cn/regist_m.jsp`](http://login.home.news.cn/regist_m.jsp)
		* surl: surl=http://xuan.news.cn 不需要base64编码
	* 登录用户信息检测
		* [http://xuan.news.cn/cloudc/loadUser.xhtm?loginCheck=true](http://xuan.news.cn/cloudc/loadUser.xhtm?loginCheck=true)

- [网眼新华阅读器:](http://xuan.news.cn/cloudread/#mytm/20140704/1774014)
	* 基本参数
		* base: http://xuan.news.cn/cloudnews/
		* hash: mytm/20140704/1774014
	    * id: 1774014 
	    * fileUuid: 2-8b7b73857f44440c909e492da71e48cc
	    * debateId: 1168 (form 新闻辩论模块)
		* channelId: 280
	* 根据contentId和channelId获取新闻列表: [``http://xuan.news.cn/cloudc/web/preNextNews.htm?contentId={contentId}&channelId={channelId}``](http://xuan.news.cn/cloudc/web/preNextNews.htm?contentId=1774014&channelId=280)
	* 完整数据: [``{base}{hash}_r.html``](http://xuan.news.cn/cloudnews/mytm/20140704/1774014_r.html)
		* 图集详细数据: [``$(".ui-gallay").data("url")``](http://xuan.news.cn/cloudnews/ktsh/20140629/1770175.json)
		* 视频详细数据: [``$("object").data("url")``](http://xuan.news.cn/cloudnews/xhsp/20140930/1811911_videos.json)
	* 相关属性: [``{base}{hash}_attrj.html``](http://xuan.news.cn/cloudnews/mytm/20140704/1774014_attrj.html)
	* 新闻集成: [``{base}{hash}_storej.html``](http://xuan.news.cn/cloudnews/mytm/20140704/1774014_storej.html)
	* 时间轴:   [``{base}{hash}_timelinej.html``](http://xuan.news.cn/cloudnews/mytm/20140704/1774014_timelinej.html)
	* 云谱图:   [``{base}{hash}_cloudj.html``](http://xuan.news.cn/cloudnews/mytm/20140704/1774014_cloudj.html)
	* 新闻地图: [``{base}{hash}_mapj.html``](http://xuan.news.cn/cloudnews/mytm/20140704/1774014_mapj.html)
	* 新闻问答: [``{base}{hash}_newsQuestj.html``](http://xuan.news.cn/cloudnews/mytm/20140704/1774014_newsQuestj.html)
	* 新闻辩论: [``{base}{hash}_debatej.html``](http://xuan.news.cn/cloudnews/mytm/20140704/1774014_debatej.html)
		* JSONP: [``http://xuan.news.cn/api/debate/getDebateP.do?callback=cbk&id={debateId}``](http://xuan.news.cn/api/debate/getDebateP.do?callback=cbk&id=1168)
	* 新闻图表: [``{base}{hash}_chartj.html``](http://xuan.news.cn/cloudnews/mytm/20140704/1774014_chartj.html)
        * 每个图表详细json数据需要二次请求

- 评论: `下载文档`[`新闻评论接口_v1.6.2.doc`](新闻评论接口_v1.6.2.doc)
	* 最新评论: [``http://comment.home.news.cn/a/newsCommAll.do?newsId={fileUuid}&pgSize=5&pid=2``](http://comment.home.news.cn/a/newsCommAll.do?newsId=2-8b7b73857f44440c909e492da71e48cc&pgSize=5&pid=2)
	* 精华评论: [``http://comment.home.news.cn/a/commentsHot.do?newsId={fileUuid}``](http://comment.home.news.cn/a/commentsHot.do?newsId=2-8b7b73857f44440c909e492da71e48cc)
	* 发表评论: [``http://comment.home.news.cn/a/adComment.do?newsId={fileUuid}``](http://comment.home.news.cn/a/adComment.do) 
	* 详细接口描述查看: [`新闻评论接口_v1.6.2.doc`](新闻评论接口_v1.6.2.doc)

- 新闻索引查询
	* 基本地址: [http://xuan.news.cn/xhCNS/search.htm?keyword=肯德基&retype=json&searchType=union&pageSize=5](http://xuan.news.cn/xhCNS/search.htm?keyword=%E8%82%AF%E5%BE%B7%E5%9F%BA&retype=json&searchType=union&pageSize=5)


发稿平台
--------

- 稿件列表
	* 列表: [`http://xuan.news.cn/cloudapi/xhadmin/content/list.do?pageNo=1&cid=283&queryStatus=checked&type=2&queryOrderBy=23&listType=list&myEdit=0`](http://xuan.news.cn/cloudapi/xhadmin/content/list.do?pageNo=1&cid=283&queryStatus=checked&type=2&queryOrderBy=23&contentId=&listType=list&myEdit=0)
	* queryStatus: 稿件库【可取以下值】
		* material: 稿源库
		* passed: 编辑库
		* checked: 签发库
	* queryOrderBy: 排序规则
		* 23、24: 优先级正逆序
		* 0、1: ID升降序
		* 6、7: 发布时间正逆序
	* type: 
		* 1: 分类查询
		* 2: 栏目查询
	* cid: 栏目ID/分类ID
	* myEdit: 
		* 1: 我的稿件
		* 0: 全部稿件
	* listType: 
		* list: 列表
		* search: 查询 
	* 检索: [`http://xuan.news.cn/cloudapi/xhadmin/content/search.do?page=1&keyWord=&tagName=&author=&editor=robotnews&dateStart=&dateEnd=&contentId=&queryStatus=checked&listType=search`](http://xuan.news.cn/cloudapi/xhadmin/content/search.do?page=1&keyWord=&tagName=&author=&editor=robotnews&dateStart=&dateEnd=&contentId=&queryStatus=checked&listType=search)
	
- 栏目 
	* 树形结构: [http://xuan.news.cn/cloudapi/xhadmin/content/tree.do?id=486](http://xuan.news.cn/cloudapi/xhadmin/content/tree.do?id=486)
- 分类 
	* 树形结构: [http://xuan.news.cn/cloudapi/xhadmin/content/catelogTree.do?id=1](http://xuan.news.cn/cloudapi/xhadmin/content/catelogTree.do?id=1)
	* 全部分类: [`http://xuan.news.cn/cloudapi/xhadmin/content/v_getAllCategory.do`](http://xuan.news.cn/cloudapi/xhadmin/content/v_getAllCategory.do)

- 稿件基本信息: [http://xuan.news.cn/cloudapi/xhadmin/content/get.do?contentId=1971054](http://xuan.news.cn/cloudapi/xhadmin/content/get.do?contentId=1971054)

- 新建稿件:
	* 栏目分类初始化: [http://xuan.news.cn/cloudapi/xhadmin/content/contentInit.do?cid=283](http://xuan.news.cn/cloudapi/xhadmin/content/contentInit.do?cid=283)
	* 获取所有体裁: [http://xuan.news.cn/cloudapi/xhadmin/integration/constant.do](http://xuan.news.cn/cloudapi/xhadmin/integration/constant.do)
- 编辑稿件:
	* 相关属性列表: [http://xuan.news.cn/cloudapi/xhadmin/attr/field.do](http://xuan.news.cn/cloudapi/xhadmin/attr/field.do)
		* 相关属性: [http://xuan.news.cn/cloudapi/xhadmin/attr/list.do?cid=1774014&type=noun](http://xuan.news.cn/cloudapi/xhadmin/attr/list.do?cid=1774014&type=noun)
	* 集成文档: [`http://xuan.news.cn/cloudapi/xhadmin/document/v_edit.do?contentId=1971286`](http://xuan.news.cn/cloudapi/xhadmin/document/v_edit.do?contentId=1971286)
	* 新闻追溯(时间轴): [http://xuan.news.cn/cloudapi/xhadmin/timeline/find.do?cid=1774014](http://xuan.news.cn/cloudapi/xhadmin/timeline/find.do?cid=1774014)
	* 新闻云谱: [http://xuan.news.cn/cloudapi/xhadmin/cloud/getSpectrum.do?cid=1774014](http://xuan.news.cn/cloudapi/xhadmin/cloud/getSpectrum.do?cid=1774014)
	* 新闻问答: [http://xuan.news.cn/cloudapi/xhadmin/quiz/find.do?cid=1774014](http://xuan.news.cn/cloudapi/xhadmin/quiz/find.do?cid=1774014)
	* 新闻群组: [http://xuan.news.cn/cloudapi/xhadmin/content/getInteract.do?contentId=1971286](http://xuan.news.cn/cloudapi/xhadmin/content/getInteract.do?contentId=1971286)
	* 新闻辩论: [http://xuan.news.cn/cloudapi/xhadmin/basic/getDebate.do?debateId=1168](http://xuan.news.cn/cloudapi/xhadmin/basic/getDebate.do?debateId=1168)
	* 新闻图表: [`http://xuan.news.cn/cloudapi/xhadmin/chart/v_chart_list.do?contentId=1774014`](http://xuan.news.cn/cloudapi/xhadmin/chart/v_chart_list.do?contentId=1774014)
- 禁用和发布模块: [http://xuan.news.cn/cloudapi/xhadmin/content/contentAttrStatic.do]
	* restatic: 是否重新静态化(true/false)
	* staticType: 模块标识
	* ids: 1774014
	* empty: true(禁用) / false(发布) 



**********************END**************************