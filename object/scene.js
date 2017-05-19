/**
 * Created by mooshroom on 2017/5/19.
 * 游戏场景创建逻辑
 */

var scene, camera, fieldOfView, aspectRatio, nearPlane,
    farPlane, HEIGHT, WIDTH, renderer, container;
function createScene() {
    // 获得屏幕的宽和高，
    // 用它们设置相机的纵横比
    // 还有渲染器的大小
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    // 创建场景
    scene = new THREE.Scene();

    // 在场景中添加雾的效果；样式上使用和背景一样的颜色
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    // 创建相机
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    /**
     * PerspectiveCamera 透视相机
     * @param fieldOfView 视角
     * @param aspectRatio 纵横比
     * @param nearPlane 近平面
     * @param farPlane 远平面
     */
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );

    // 设置相机的位置
    camera.position.x = 0;
    camera.position.z = 200;
    camera.position.y = 100;

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({
        // 在 css 中设置背景色透明显示渐变色
        alpha: true,
        // 开启抗锯齿，但这样会降低性能。
        // 不过，由于我们的项目基于低多边形的，那还好 :)
        antialias: true
    });

    // 定义渲染器的尺寸；在这里它会填满整个屏幕
    renderer.setSize(WIDTH, HEIGHT);

    // 打开渲染器的阴影地图
    renderer.shadowMap.enabled = true;

    // 在 HTML 创建的容器中添加渲染器的 DOM 元素
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
    window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
    // 更新渲染器的高度和宽度以及相机的纵横比
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}


//光源
var hemisphereLight, shadowLight;
function createLights() {
    // 半球光就是渐变的光；
    // 第一个参数是天空的颜色，第二个参数是地上的颜色，第三个参数是光源的强度
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);

    // 方向光是从一个特定的方向的照射
    // 类似太阳，即所有光源是平行的
    // 第一个参数是关系颜色，第二个参数是光源强度
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);

    // 设置光源的方向。
    // 位置不同，方向光作用于物体的面也不同，看到的颜色也不同
    shadowLight.position.set(150, 350, 350);

    // 开启光源投影
    shadowLight.castShadow = true;

    // 定义可见域的投射阴影
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    // 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    // 为了使这些光源呈现效果，只需要将它们添加到场景中
    scene.add(hemisphereLight);
    scene.add(shadowLight);
}