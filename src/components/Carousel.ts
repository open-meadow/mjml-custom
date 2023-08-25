// my component
import type { Editor } from "grapesjs";
import { componentsToQuery, getName, isComponentType } from "./utils";
import { type as typeSection } from "./Section";
import { type as typeColumn } from "./Column";
import { type as typeHero } from "./Hero";
import { type as typeCarouselImage } from "./CarouselImage";

export const type = "mj-carousel";

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
  console.log("Carousel!!!");
  editor.Components.addType(type, {
    isComponent: isComponentType(type),
    model: {
      ...coreMjmlModel,
      defaults: {
        name: getName(editor, "carousel"),
        resizable: true,
        highlightable: true,
        draggable: componentsToQuery([typeSection, typeColumn, typeHero]),
        droppable: componentsToQuery(typeCarouselImage),
        stylable: [
          "width",
          "height",
          "padding",
          "padding-top",
          "padding-left",
          "padding-right",
          "padding-bottom",
          "border-radius",
          "border-top-left-radius",
          "border-top-right-radius",
          "border-bottom-left-radius",
          "border-bottom-right-radius",
          "border",
          "border-width",
          "border-style",
          "border-color",
          "container-background-color",
          "align",
        ],
        "style-default": {
          "border": "3px solid red",
        },
        traits: [
          {
            type: "select",
            label: "Mode",
            name: "mode",
            options: [
              { value: "horizontal", name: "Horizontal" },
              { value: "vertical", name: "Vertical" },
            ],
          },
        ],
      },
    },

    view: {
      ...coreMjmlView,
      tagName: "tr",
      attributes: {
        style: "display: table; width: 100%; padding: 1em 1em;",
      },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body width="auto"><mj-column>`,
          end: `</mj-column></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl: any) {
        return sandboxEl.querySelector("tr").innerHTML;
      },

      getChildrenSelector() {
        return "td";
      },

      rerender() {
        coreMjmlView.rerender.call(this);
        this.model.components().models.forEach((item: any) => {
          if(item.attributes.type !== typeCarouselImage) {
            return;
          }
          item.view.rerender();
        });
      },

      init() {
        coreMjmlView.init.call(this);
        this.listenTo(this.model.get('components'), 'add remove update', this.render);
      },
    },
  });
};
