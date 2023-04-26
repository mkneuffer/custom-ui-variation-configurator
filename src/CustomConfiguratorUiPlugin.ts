import { AViewerPlugin, ViewerApp, VariationConfiguratorPlugin } from "webgi";

export class CustomConfiguratorUiPlugin extends AViewerPlugin<""> {
  static readonly PluginType = "CustomConfiguratorUiPlugin";
  enabled = true;

  wrapper: HTMLElement;

  constructor() {
    super();
    this.wrapper = document.querySelector(".ui")!;
  }

  async onAdded(v: ViewerApp): Promise<void> {
    await super.onAdded(v);

    const config = v.getPlugin(VariationConfiguratorPlugin)!;

    //objects
    config.variations.objects.forEach((obj) => {
      let category = document.createElement("div");
      category.innerHTML = obj.name + " ";

      for (let i = 0; i < obj.items.length; i++) {
        let item = document.createElement("button");
        item.innerHTML = obj.icons[i];

        item.addEventListener("click", () => {
          config.applyVariation(obj, i, "objects");
        });

        category.appendChild(item);
      }
      this.wrapper.appendChild(category);
    });

    //materials
    config.variations.materials.forEach((mat) => {
      let category = document.createElement("div");
      category.innerHTML = mat.name + " ";

      for (let i = 0; i < mat.items.length; i++) {
        let item = document.createElement("button");
        item.innerHTML = config.utils.getItemTitle(mat, i);
        item.style.background = `url("${config.utils.getItemIcon(mat, i, "materials")}")`;

        item.addEventListener("click", () => {
          config.applyVariation(mat, i, "materials");
        });

        category.appendChild(item);
      }
      this.wrapper.appendChild(category);
    });
  }

  async onRemove(v: ViewerApp): Promise<void> {
    this.wrapper.innerHTML = "";

    return super.onRemove(v);
  }
}
