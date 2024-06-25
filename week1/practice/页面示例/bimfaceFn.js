// 声明 viewer 及 app
let viewer, app;
// 声明 UI管理器、主工具条、自定义工具条、图层管理器
let uiMng, mainToolbar, toolbar, layerMng, extLayer;
let viewToken = '56c054f6d76a4dcf9d706cddb51e16e6'; // 0624demo sceneId:2928186434164288

let currentObjectId;
let extObjLayer;
let extObjMng;
// 初始化SDKLoader
let BimfaceLoaderConfig = new BimfaceSDKLoaderConfig();
BimfaceLoaderConfig.viewToken = viewToken;
BimfaceLoaderConfig.version = '3.6.283'; // 控制sdk版本
BimfaceSDKLoader.load(BimfaceLoaderConfig, onSDKLoadSucceeded, onSDKLoadFailed);

// 资源加载成功的回调函数
function onSDKLoadSucceeded(viewMetaData) {

  // 构造app
  let dom4Show = document.getElementById('domId');
  let webAppConfig = new Glodon.Bimface.Application.WebApplicationGISConfig();
  webAppConfig.domElement = dom4Show;
  app = new Glodon.Bimface.Application.WebApplicationGIS(webAppConfig);

  // 获取viewer并加载场景
  viewer = app.getViewer();
  viewer.addScene(viewToken);
  
  app = new Glodon.Bimface.Application.WebApplicationGIS(webAppConfig);

  // 场景加载的监听事件，场景加载后获取主工具条、管理器等对象
  viewer.addEventListener(Glodon.Bimface.Viewer.ViewerGISEvent.SceneAdded, function () {
    // 获取图层管理器
    extObjMng = new Glodon.Bimface.Plugins.ExternalObject.ExternalObjectManager(viewer);
    // layerMng = viewer.getLayerManager();
    // 获取UI管理器
    uiMng = app.getUIManager();
    setOpacity();
    // createExtObjLayerMng();
  });

  // 图层加载完毕的监听事件，图层加载后对模型进行着色
  viewer.addEventListener(Glodon.Bimface.Viewer.ViewerGISEvent.LayerAdded, function (data) {});
}

// 资源加载失败的回调函数
function onSDKLoadFailed(error) {
  console.log(error);
};

let sectionBox;
// 开启刨切盒子
function showSectionBox() {
  const sectionBoxConfig = new Glodon.Bimface.Plugins.Section.SectionBoxConfig();
  sectionBoxConfig.direction = 'forward'; // 正方向
  sectionBoxConfig.filter = ['layer_10000865296315'];
  sectionBoxConfig.viewer = viewer;
  sectionBoxConfig.plane = 'x';
  // sectionBoxConfig.hatchByMaterial = false; // 基于原有材质颜色进行补面
  sectionBoxConfig.isHatchEnabled=false;
  sectionBox = new Glodon.Bimface.Plugins.Section.SectionBox(sectionBoxConfig);
  // sectionBox.rotateByAxis('x', 60, true);
  sectionBox.fitToModel()
  sectionBox.showBox();
  // sectionBox.hideBox();
}

// 隐藏包围盒子
function hideSectionBox() {
  sectionBox.hideBox();
  // viewer.render();
}

// 绘制多边形
//  "Latlng":[32.35838686,111.42933063,32.35697777,111.43302519,32.12074142,111.31181030,32.12223894,111.30789431,32.12821337,111.31101790,32.35838686,111.42933063]
function drawPolygon() {
  let latLngList = [{lat: 32.35838686, lng: 111.42933063}, {lat: 32.35697777, lng: 111.43302519}, {lat: 32.12074142, lng: 111.31181030}, 
    {lat: 32.12223894, lng: 111.30789431}, {lat: 32.12821337, lng: 111.31101790}, {lat: 32.35838686, lng: 111.42933063}]
    const points = lngLatToWorldPosition(latLngList, viewer);
    console.log(points, 'points---012');
    const splineCurve = createPolygon(points)
    const calibrationLineId = extObjMng.loadObject({ name: '校准线', object: splineCurve });

}

/**
 * 路径曲线的构造函数
 * @param worldCoordList
 * @returns
 */
function createPolygon(points) {
  const redLineObj = {
    width: 6,
    color: '#FF002B', // '#FF0000'
    transparency: 0.15, // 0.3
    style: {lineType: 'Continuous',lineStyle: null}
  }
  const { color, width, transparency, style } = redLineObj;
  const option = {
    points,
    viewer: viewer,
    color: new Glodon.Web.Graphics.Color(color, transparency),
    type: 'polyline',
    width,
    style
  };
  let splineCurve = new Glodon.Bimface.Plugins.Geometry.SplineCurve(option);
  // 贴地模式, 可填 "Ground": 仅贴地形; "Model": 仅贴模型; "Both": 贴模型与地形; "Space": 空间线
  splineCurve.clampMode({
    mode: 'Both',
  });
  return splineCurve;
}

function lngLatToWorldPosition(
  lngLatData,
  viewerGIS,
) {
  if (!!!lngLatData) return;
  // 世界坐标转换
  const worldCoordList = lngLatData.reduce((prev, next) => {
    /**
     * viewGis转换成世界坐标
     * 获取地形的图层ID typeName：地形(TerrainLayer),模型(BIMLayer),
     */

    // 转化成经纬度坐标（劳务用的GCJ_02， bimFace【天地图】用的WGS_84）
    //   let temp: any = GPS.GCJ_02toWGS_84(next.lat, next.lng);
    const option = {
      latLon: {
        lat: next.lat,
        lon: next.lng
      },
      layerId: 'layer_terrain_1'
    };
    // 转成viewGis世界坐标
    const worldCoordinates = viewerGIS.latLonToWorld(option);
    const { x, y, z } = worldCoordinates;
    if (!Number.isNaN(x) && !Number.isNaN(y) && !Number.isNaN(z)) {
      prev.push(worldCoordinates);
    }
    return prev;
  }, []);
  return worldCoordList;
}

// 设置透明度
function setOpacity() {
  const layerMapModel = viewer.getLayerManager().getLayer('layer_map_1');
  layerMapModel.setOpacity(0.3);
  viewer.render();
}

// 漫游对象
let walkthrough;
function getWalkthrough() {
  if (!walkthrough) {
    let walkthroughConfig = new Glodon.Bimface.Plugins.Walkthrough.WalkthroughConfig();
    walkthroughConfig.viewer = viewer;
    walkthrough = new Glodon.Bimface.Plugins.Walkthrough.Walkthrough(walkthroughConfig);
  }
}

// 添加漫游点
function addKeyFrame() {
  let wtPoint = walkthrough.addKeyFrame();
  console.log(wtPoint);
  return wtPoint;
}

// 保存漫游点
let keyFrameList = []; // 漫游点对象
function saveKeyFrame() {
  getWalkthrough();
  console.log(walkthrough, 'walkthrough----01');
  const wtPoint = addKeyFrame();
  // walkthrough.setKeyFrame(wtPoint)
  keyFrameList.push(wtPoint);
}

// 定位到该点
// let playIndex = 0;
function play() {
  // clearKeyFrames();
  // walkthrough.setKeyFrames(addKeyFrame());
  // if (keyFrameList?.[playIndex]) {
    walkthrough.setKeyFrames(keyFrameList);
    // console.log(walkThrough.getKeyFrame(), 'walkThrough.getKeyFrames()---12');
    // playIndex++
    walkthrough.play();
  }
// }

// 清空关键帧
function clearKeyFrames() {
  walkthrough.clearKeyFrames();
}

function zoomToRisk(position) {
  const { x, y, z } = position;
  const currentPosition = {
    boundingBox: {
      max: {
        x: x + 100,
        y: y + 100,
        z: z
      },
      min: {
        x: x - 100,
        y: y - 100,
        z: z
      }
    }
  };
  viewer.zoomToBoundingBox(currentPosition);
}




/***************华丽分割线-start-废弃代码*******************/
//  切割构件（不使用）
function getModalLayer() {
  const currentModel = viewer.getLayerManager().getLayer('layer_10000865296315');
  const boundingBox = currentModel.getBoundingBox(10000865296315)
  if (boundingBox?.max && boundingBox?.min) {
    const { max, min } = boundingBox;
    const cutPoint = {
      x: (min.x + max.x) / 2,
      y: (min.y + max.y) / 2,
      z: (min.z + max.z) / 2
    }
    const plane = {
      point: { ...cutPoint },
      normal: { x: 0, y: 0, z: 1 }
    };
    const componentManager = currentModel.getComponentManager();
    const componentArray = componentManager.splitComponentByPlane(7004256694576150690, plane);

    if (componentArray?.[0]) {
      extObjMng.loadObject(
        {
          name: '外部构件01',
          object: componentArray?.[0]
        },
        function() {
          const objectId = extObjMng.getObjectIdByName('外部构件01');
          viewer.render();
        }
      );
    }
    componentManager.hide({ ids: [7004256694576150690] }); // 隐藏原构件
  }
}

/***************华丽分割线-end-废弃代码*******************/
