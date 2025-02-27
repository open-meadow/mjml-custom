// Specs: https://documentation.mjml.io/#mj-image
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeSection } from './Section';
import { type as typeColumn } from './Column';
import { type as typeHero } from './Hero';

export const type = 'mj-table';

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
  editor.Components.addType(type, {
    isComponent: isComponentType(type),
    extend: 'table',
    model: {
      ...coreMjmlModel,
      defaults: {
        resizable: false,
        highlightable: false,
        name: getName(editor, 'table'),
        // draggable: componentsToQuery([typeSection, typeColumn, typeHero]),
        // stylable: [
        //   'width', 'height',
        //   'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
        //   'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
        //   'border', 'border-width', 'border-style', 'border-color',
        //   'container-background-color', 'align',
        // ],
        // 'style-default': {
        //   'padding-top': '10px',
        //   'padding-bottom': '10px',
        //   'padding-right': '25px',
        //   'padding-left': '25px',
        //   'align': 'center',
        // },
        // traits: ['href', 'rel', 'alt', 'title'],
        // void: false,
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'table',
      attributes: {
        style: 'pointer-events: all; display: table; width: 100%; user-select: none; border: 3px solid red;',
      },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body width="auto"><mj-column>`,
          end: `</mj-column></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl: any) {
        return sandboxEl.querySelector('tr').innerHTML;
      },

      getChildrenSelector() {
        return 'table';
      },
    },
  });
};
