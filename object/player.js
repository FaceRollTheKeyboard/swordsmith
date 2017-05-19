/**
 * Created by mooshroom on 2017/5/19.
 */
var playerAndSword=function () {
    this.mesh=new THREE.Object3D()

    //创建身体
    var geomBody=new THREE.BoxGeometry(10,10,10,1,1,1)
    var matBody=new THREE.MeshPhongMaterial({color:Colors.red,shading:THREE.FlatShading})
    var body=new THREE.Mesh(geomBody,matBody)
    body.castShadow=true
    body.receiveShadow=true
    this.mesh.add(body)
}

var player;
function createPlayer(){
    player=new playerAndSword();
    player.mesh.position.y=10
    scene.add(player.mesh)
}