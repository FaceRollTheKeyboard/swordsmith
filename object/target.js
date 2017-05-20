/**
 * Created by mooshroom on 2017/5/20.
 */
var Target=function () {
    var geom=new THREE.SphereGeometry(1)
    var mat=new THREE.MeshPhongMaterial({
        color:Colors.red,
        opacity:.3,
        shading:THREE.FlatShading
    })
    this.mesh=new THREE.Mesh(geom,mat)
    this.mesh.receiveShadow=false
}

var target;
function createTarget() {
    target=new Target()
    target.mesh.position.set(0,20,0)
    scene.add(target.mesh)
}