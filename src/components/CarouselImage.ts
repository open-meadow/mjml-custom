// my component
import type { Editor } from "grapesjs";
import { componentsToQuery, getName, isComponentType } from "./utils";
import { type as typeSection } from "./Section";
import { type as typeColumn } from "./Column";
import { type as typeHero } from "./Hero";
import { type as typeCarousel } from "./Carousel";

export const type = "mj-carousel-image";

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
  console.log("carousel-image");
  editor.Components.addType(type, {
    isComponent: isComponentType(type),
    model: {
      ...coreMjmlModel,
      defaults: {
        name: getName(editor, "carousel-image"),
        resizable: true,
        highlightable: true,
        extend: 'img',
        draggable: componentsToQuery([
          typeSection,
          typeColumn,
          typeHero,
          typeCarousel,
        ]),
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
          border: "3px solid green",
        },
        // traits: ["href", "src", "rel", "alt", "title"],
      },
    },

    view: {
      ...coreMjmlView,
      tagName: "a",
      attributes: {
        style: "pointer-events: all; float: none; display: inline-table; border: 3px solid red;",
      },

      getMjmlTemplate() {
        let parentView = this.model.parent()?.view;
        // console.log("parView: ", parentView);

        // if (parentView?.getInnerMjmlTemplate) {
        //   let mjmlCarousel = coreMjmlView.getInnerMjmlTemplate.call(parentView);
        //   return {
        //     start: `<mjml><mj-body><mj-column>${mjmlCarousel.start}`,
        //     end: `${mjmlCarousel.end}</mj-column></mj-body></mjml>`,
        //   };
        // } else {
        //   return {
        //     start: `<mjml><mj-body><mj-column><mj-carousel>`,
        //     end: `</mj-carousel></mj-column></mj-body></mjml>`,
        //   };
        // }

        let mjmlCarousel = coreMjmlView.getInnerMjmlTemplate.call(parentView);
        console.log("mjmlCAr: ", mjmlCarousel);

        return {
          start: `<mjml><mj-body width="auto"><mj-section>${mjmlCarousel.start}`,
          end: `${mjmlCarousel.end}</mj-section></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl: any) {
        return sandboxEl.querySelector('a.mj-carousel-thumbnail').innerHTML;
      },

      getChildrenSelector() {
        return "img";
      },
    },
  });
};
