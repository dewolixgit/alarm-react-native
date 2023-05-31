import { loadAsync } from 'expo-font';

import { ValueModel } from '../../../shared/models/ValueModel';
import FONTS from '../../../styles/fonts';

class UIStore {
  isFontsLoaded = new ValueModel(false);

  loadFonts = async (): Promise<void> => {
    if (this.isFontsLoaded.value) {
      return;
    }

    await loadAsync(FONTS);
    this.isFontsLoaded.setValue(true);
  };
}

export const uiStore = new UIStore();
