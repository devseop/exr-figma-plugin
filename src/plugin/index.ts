import {
  PlugInCallbackFunction,
  PluginAcion,
  PluginMessagePayload,
} from '../shared';

figma.showUI(__html__);

// payload 타입 가드
function isPayload(payload: unknown): payload is PluginMessagePayload {
  return (
    typeof payload === 'object' &&
    Object.prototype.hasOwnProperty.call(payload, 'type') &&
    Object.prototype.hasOwnProperty.call(payload, 'randomQuote')
  );
}

// 피그마 플러그인에서 텍스트를 다룰 때 주의할 점은 폰트를 미리 불러와야 한다는 것
// 폰트를 불러오지 않고 텍스트 노드의 속성에 접근시 에러가 발생
/** 텍스트 노드 속성을 다루기 위한 폰트 설정 함수 */
async function loadFonts() {
  await figma.loadFontAsync({
    family: 'Roboto',
    style: 'Regular',
  });
}

function generateRandomQuote({ randomQuote }: PluginMessagePayload) {
  // 임의의 인용문 데이터 출력
  console.log('PLUGIN:', randomQuote);

  // 1. 현재 사용자가 선택한 노드를 가지고 와서
  const currentSelectionNode = figma.currentPage.selection[0];

  // 2. 사용자가 선택한 노드가 텍스트 노드인지 확인하고
  if (currentSelectionNode?.type === 'TEXT') {
    // 2-1. 텍스트 노드의 폰트를 설정하고
    currentSelectionNode.fontName = {
      family: 'Roboto',
      style: 'Regular',
    };
    // 2-2. 텍스트 노드라면 내용을 인용문으로 대체
    currentSelectionNode.characters = `${randomQuote.text} - ${
      randomQuote.author || 'unknown'
    }`;
  } else {
    // 2-3. 텍스트 노드가 아니면 에러를 던집니다.
    throw new Error('No text node is selected');
  }
}

loadFonts().then(() => {
  figma.ui.onmessage = (payload: unknown) => {
    const callbackMap: Record<PluginAcion, PlugInCallbackFunction> = {
      generateRandomQuote,
    };

    if (isPayload(payload) && callbackMap[payload.type]) {
      callbackMap[payload.type](payload);
    }
  };
});
