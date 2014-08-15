var xmlreader = require('xmlreader'),
	fs = require('fs');

fs.readFile('world.xml',function(err,data){
	xmlreader.read(data.toString(),function(err,json){
		function children(t){
			return t['continent'] || t['country'] || t['province'] || t['city'] || t['county'] || {}
		}
		function exec(w){
			var world = [], selector = {}, attr = w.attributes(), c = children(w) ;
			w.children = c.array;

			world.push( ([attr.code,attr.value,attr.parentCode,attr.firstHead,attr.en]).join(',') );
			if( w.children ){
				world.push( [] );
				w.children.map(function(m,i){
					var result = exec( m ), att = m.attributes();
					world[1].push(result.world);
					if( children(m).array ){
						selector[att.value+'_'+att.code] = result.selector;
					}else{
						selector[att.value] = att.code;
					}
				});
			}else if(c.attributes){
				var  attt = c.attributes();
				world.push( [ ([attt.code,attt.value,attt.parentCode,attt.firstHead,attt.en]).join(',') ] );
			}
			return {
				world:world,
				selector:selector
			}
		}

		var m = exec(json.world);
		fs.writeFile( 'temp.json', JSON.stringify(m.selector) ,function(err){
			console.log( err || 'OK')
		})
	})
})