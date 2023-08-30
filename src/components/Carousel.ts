// my component
import type { Editor } from "grapesjs";
import {
  componentsToQuery,
  getName,
  isComponentType,
  mjmlConvert,
} from "./utils";
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
        style:
          "pointer-events: all; display: table; width: 100%; border: 3px solid red;",
      },

      // render() {
      //   this.renderAttributes();
      //   const sandbox = document.createElement('div');
      //   let mjmlResult = this.getTemplateFromMjmlWithStyle();
      //   sandbox.innerHTML = mjmlResult.content;
      //   const carouselEl = sandbox.querySelector('.mj-carousel');

      //   editor.addComponents(`<style>${mjmlResult.style}</style>`);
      //   debugger;
      //   this.renderStyle();
      //   return this;
      // },

      // getTemplateFromEl(sandboxEl: { firstChild: { querySelector: (arg0: string) => { (): any; new(): any; parentElement: any; }; }; }) {
      //   return sandboxEl.firstChild.querySelector('.mj-carousel').parentElement;
      // },

      // getChildrenSelector() {
      //   return '.mj-carousel-images';
      // },

      // getInnerMjmlTemplate() {
      //   let innerMjmlTemplate = coreMjmlView.getInnerMjmlTemplate.call(this);
      //   // TODO replace this with dynamic mjml images
      //   innerMjmlTemplate.start = `${innerMjmlTemplate.start}
      //     <mj-carousel-image src="https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg"></mj-carousel-image>
      //     <mj-carousel-image src="https://www.mailjet.com/wp-content/uploads/2016/09/3@1x.png"></mj-carousel-image>
      //     <mj-carousel-image src="https://www.mailjet.com/wp-content/uploads/2016/09/1@1x.png"></mj-carousel-image>`;
      //   // innerMjmlTemplate.start = `${innerMjmlTemplate.start}${this.model.getCarouselImagesMjml()}`;
      //   return innerMjmlTemplate;
      // },

      // getMjmlTemplate() {
      //   return {
      //     start: `<mjml><mj-body><mj-section><mj-column>`,
      //     end: `</mj-column></mj-section></mj-body></mjml>`,
      //   };
      // },

      init() {
        coreMjmlView.init.call(this);
        this.listenTo(
          this.model.get("components"),
          "add remove update",
          this.render
        );
      },

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
        // TODO replace this with dynamic mjml images
        innerMjmlTemplate.start = `${innerMjmlTemplate.start}
          <mj-carousel-image src="https://source.unsplash.com/random/200x141"></mj-carousel-image>
          <mj-carousel-image src="https://source.unsplash.com/random/200x142"></mj-carousel-image>
          <mj-carousel-image src="https://source.unsplash.com/random/200x143"></mj-carousel-image>`;
        console.log("innerMjmlTemplate: ", innerMjmlTemplate.start);
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
