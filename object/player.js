/**
 * Created by mooshroom on 2017/5/19.
 */
var playerAndSword=function () {
    this.mesh=new THREE.Object3D()

    //创建身体
    var geomBody=new THREE.CubeGeometry(10,10,10)
    var matBody=new Physijs.createMaterial(
        new THREE.MeshPhongMaterial({
            color:Colors.red,
            shading:THREE.FlatShading,

        }),
        0.5,
        1
    )

    this.mesh=new Physijs.BoxMesh(geomBody,matBody,1)
    this.mesh.castShadow=true
    this.mesh.receiveShadow=true
}

var player;
function createPlayer(){
    player=new playerAndSword();
    player.mesh.position.y=100
    player.mesh.name='player'
    scene.add(player.mesh)
}