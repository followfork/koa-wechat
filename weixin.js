'use strict'

exports.reply = function* (next){
	var message = this.weixin

	if(message.MsgType === 'event') {
		if(message.Event === 'subscribe') {
			if(message.EventKey) {
				console.log('扫描二维码进来: ' + message.EventKey + ' ' + message.Ticket)
			}

			this.body = 'haha, 欢迎订阅'
		} else if(message.Event === 'unsubscribe'){
			console.log('取消关注')
			this.body = ''
		} else if(message.Event === 'LOCATION'){
			this.body = '位置：' + message.Latitude + '/' + message.Longitude + '-' + message.Precision
		} else if(message.Event === 'CLICK'){
			this.body = '点击菜单：' + message.EventKey
		} else if(message.Event === 'SCAN'){
			console.log('关注后扫描二维码' + message.EventKey + ' ' + message.ticket)
			this.body = '扫描了二维码'
		} else if(message.Event === 'VIEW'){
			this.body = '点击了菜单中的链接：' + message.EventKey
		}
	} else if(message.MsgType === 'text') {
		var content = message.Content
		var reply = content + '!!!'

		if(content === '1') {
			reply = '1、所有服务号都可以在功能->添加功能插件处看到申请模板消息功能的入口，但只有认证后的服务号才可以申请模板消息的使用权限并获得该权限；'
		}
		else if(content === '2') {
			reply = '2、需要选择公众账号服务所处的2个行业，每月可更改1次所选行业；'
		}
		else if(content === '3') {
			reply = '3、在所选择行业的模板库中选用已有的模板进行调用；'
		}
		else if(content ==='4') {
			reply = [{
				title: '我是标题',
				description: '这是一段很长的描述，哈哈哈哈哈哈哈哈哈哈哈',
				picUrl: 'http://f2.sjbly.cn/s13/0906/1154/64f7b1f39db14cc9b55a6de8a5872243_metal.jpg',
				url: 'www.baidu.com'
			}]
		}

		this.body = reply
	}

	yield next
}


