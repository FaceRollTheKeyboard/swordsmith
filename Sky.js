/**
 * Created by mooshroom on 2017/3/28.
 */
Cloud = function(){
    // 创建一个空的容器放置不同形状的云
    this.mesh = new THREE.Object3D();

    // 创建一个正方体
    // 这个形状会被复制创建云
    var geom = new THREE.BoxGeometry(20,20,20);

    // 创建材质；一个简单的白色材质就可以达到效果
    var mat = new THREE.MeshPhongMaterial({
        color:Colors.white,
    });

    // 随机多次复制几何体
    var nBlocs = 3+Math.floor(Math.random()*3);
    for (var i=0; i<nBlocs; i++ ){

        // 通过复制几何体创建网格
        var m = new THREE.Mesh(geom, mat);

        // 随机设置每个正方体的位置和旋转角度
        m.position.x = i*15;
        m.position.y = Math.random()*10;
        m.position.z = Math.random()*10;
        m.rotation.z = Math.random()*Math.PI*2;
        m.rotation.y = Math.random()*Math.PI*2;

        // 随机设置正方体的大小
        var s = .1 + Math.random()*.9;
        m.scale.set(s,s,s);

        // 允许每个正方体生成投影和接收阴影
        m.castShadow = true;
        m.receiveShadow = true;

        // 将正方体添加至开始时我们创建的容器中
        this.mesh.add(m);
    }
}

// 定义一个天空对象
Sky = function(){
    // 创建一个空的容器
    this.mesh = new THREE.Object3D();

    // 选取若干朵云散布在天空中
    this.nClouds = 20;

    // 把云均匀地散布
    // 我们需要根据统一的角度放置它们
    var stepAngle = Math.PI*2 / this.nClouds;

    // 创建云对象
    for(var i=0; i<this.nClouds; i++){
        var c = new Cloud();

        // 设置每朵云的旋转角度和位置
        // 因此我们使用了一点三角函数
        var a = stepAngle*i; //这是云的最终角度
        var h = 750 + Math.random()*200; // 这是轴的中心和云本身之间的距离

        // 三角函数！！！希望你还记得数学学过的东西 :)
        // 假如你不记得:
        // 我们简单地把极坐标转换成笛卡坐标
        c.mesh.position.y = Math.sin(a)*h;
        c.mesh.position.x = Math.cos(a)*h;

        // 根据云的位置旋转它
        c.mesh.rotation.z = a + Math.PI/2;

        // 为了有更好的效果，我们把云放置在场景中的随机深度位置
        c.mesh.position.z = -400-Math.random()*400;

        // 而且我们为每朵云设置一个随机大小
        var s = 1+Math.random()*2;
        c.mesh.scale.set(s,s,s);

        // 不要忘记将每朵云的网格添加到场景中
        this.mesh.add(c.mesh);
    }
}

// 现在我们实例化天空对象，而且将它放置在屏幕中间稍微偏下的位置。

var sky;

function createSky(){
    sky = new Sky();
    sky.mesh.position.y = -600;
    scene.add(sky.mesh);
}