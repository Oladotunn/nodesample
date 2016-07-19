import Color from 'color';

import {Platform} from 'react-native';

module.exports = {
    toolbarDefaultBg: (Platform.OS === 'ios' ) ? "#F8F8F8" : "#C9C9CE",
}
