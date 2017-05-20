/**
 * Created by mooshroom on 2017/5/19.
 * 地面构建逻辑
 */
var Ground=function () {
    var geom=new THREE.BoxGeometry(1000,1000,1000,1,1,1)
    var mat=new THREE.MeshPhongMaterial({
        color:Colors.blue,
        transparent:true,
        opacity:.6,
        shading:THREE.FlatShading
    })
    this.mesh=new THREE.Mesh(geom,mat)
    this.mesh.receiveShadow=true
}

var ground;
function createGround(){
    ground=new Ground();
    ground.mesh.position.y=-500
    ground.mesh.name='ground'
    scene.add(ground.mesh)
}