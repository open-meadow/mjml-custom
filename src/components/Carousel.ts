// my component
import type { Editor } from "grapesjs";
import {
  componentsToQuery,
  getName,
  isComponentType,
  mjmlConvert,
} from "./utils";

import mjml2html from "mjml";

import { type as typeSection } from "./Section";
import { type as typeColumn } from "./Column";
import { type as typeHero } from "./Hero";
import { type as typeCarouselImage } from "./CarouselImage";

export const type = "mj-carousel";

export default (
  editor: Editor,
  { opt, coreMjmlModel, coreMjmlView, sandboxEl }: any
) => {
  console.log("Carousel!!!");

  editor.Components.addType(type, {
    isComponent: isComponentType(type),
    model: {
      ...coreMjmlModel,
      defaults: {
        name: getName(editor, "carousel"),
        resizable: true,
        highlightable: true,
        droppable: componentsToQuery(typeCarouselImage),
        draggable: "[data-gjs-type=mj-column]",
        stylable: [
          "border-radius",
          "border-top-left-radius",
          "border-top-right-radius",
          "border-bottom-left-radius",
          "border-bottom-right-radius",
          "tb-border-radius",
          "tb-border-top-left-radius",
          "tb-border-top-right-radius",
          "tb-border-bottom-left-radius",
          "tb-border-bottom-right-radius",
          "tb-border",
          "tb-border-style",
          "tb-border-color",
          "tb-border-width",
          "tb-hover-border-color",
          "tb-selected-border-color",
          "tb-width",
          "icon-width",
        ],
        traits: [
          {
            // make it so that you have to enter text for how many images you want
            label: "Thumbnail",
            name: "thumbnails",
            options: [
              { value: "visible", name: "Visible" },
              { value: "hidden", name: "Hidden" },
            ],
            type: "select",
          },
        ],
      },
    },

    view: {
      ...coreMjmlView,
      tagName: "tr",
      attributes: {
        styles: `pointer-events: all; display: table; width: 100%; border: 3px solid red;`,
      },

      init() {
        coreMjmlView.init.call(this);
        this.listenTo(
          this.model.get("components"),
          "add remove update",
          this.render
        );
      },

      // getTemplateFromMjml() {
      //   const mjmlTmpl = this.getMjmlTemplate();
      //   console.log("mjmlTmpl: ", mjmlTmpl);
      //   const innerMjml = this.getInnerMjmlTemplate();
      //   const htmlOutput = mjmlConvert(`${mjmlTmpl.start}
      //     ${innerMjml.start}${innerMjml.end}${mjmlTmpl.end}`, opt.fonts);
      //   const html = htmlOutput.html;
      // },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body width><mj-section><mj-column>`,
          end: `</mj-column></mj-section></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl: any) {
        return sandboxEl.querySelector("tr").innerHTML;
      },

      getChildrenSelector() {
        return ".mj-carousel-images";
      },

      getInnerMjmlTemplate() {
        let innerMjmlTemplate = coreMjmlView.getInnerMjmlTemplate.call(this);
        console.log(
          "this.model.config.components: ",
          this.model.config.components,
          typeof this.model.config.components
        );

        let mjmlString = this.model.config.components || "";
        mjmlString?.toString();
        const carouselRegex = /<mj-carousel>[\s\S]*?<\/mj-carousel>/g;
        const imageRegex = /<mj-carousel-image[^>]*>/g;
        // console.log("carouselRegex: ", carouselRegex);

        const carouselMatches = (mjmlString as string).match(carouselRegex);
        // console.log("carouselMatches: ", carouselMatches);
        let finalImages = "";

        carouselMatches?.forEach((carousel, index) => {
          // console.log(`Carou sel ${index + 1}`);
          const imageMatches = carousel.match(imageRegex);
          // console.log("imageMatches: ", imageMatches);
          if (imageMatches) {
            imageMatches.forEach((image, imgIndex) => {
              // console.log(` Image ${imgIndex + 1}`);
              // console.log(image);
              finalImages += image + "\n";
            });
          }
        });

        console.log("finalImages: ", finalImages);

        innerMjmlTemplate.start = `${innerMjmlTemplate.start}
          ${finalImages}`;
        // innerMjmlTemplate.start = `${innerMjmlTemplate.start}${this.model.getCarouselImagesMjml()}`;
        return innerMjmlTemplate;
      },

      rerender() {
        coreMjmlView.rerender.call(this);
        this.model.components().models.forEach((item: any) => {
          if (item.attributes.type !== typeCarouselImage) {
            return;
          }
          item.view.rerender();
        });
      },

      // render() {
      //   this.renderAttributes();
      //   const sandbox = document.createElement("div");
      //   let mjmlResult = this.getTemplateFromMjml();
      //   sandbox.innerHTML = mjmlResult.content;
      //   const carouselEl = sandbox.querySelector(".mj-carousel");

      //   editor.addComponents(`<style>${mjmlResult.style}</style>`);
      //   debugger;
      //   this.renderStyle();
      //   return this;
      // },
    },
  });
};
