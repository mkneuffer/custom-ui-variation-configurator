import { ViewerApp, AssetManagerPlugin, addBasePlugins, AssetManagerBasicPopupPlugin, VariationConfiguratorPlugin } from "webgi";
import { CustomConfiguratorUiPlugin } from "./CustomConfiguratorUiPlugin";

async function setupViewer() {
  // Initialize the viewer
  const viewer = new ViewerApp({
    canvas: document.getElementById("webgi-canvas") as HTMLCanvasElement,
  });

  const manager = await viewer.addPlugin(AssetManagerPlugin);
  await viewer.addPlugin(AssetManagerBasicPopupPlugin);
  const config = await viewer.addPlugin(VariationConfiguratorPlugin);

  // Load scene settings
  manager.addFromPath("/scene.vjson");

  await addBasePlugins(viewer);
  viewer.renderer.refreshPipeline();

  await config.importPath("/config.json");

  //make sure to add the plugin after the config.json is imported
  await viewer.addPlugin(CustomConfiguratorUiPlugin);
}

setupViewer();
