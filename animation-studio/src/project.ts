import {makeProject} from '@motion-canvas/core';
import conditionalAccess from './scenes/conditional-access?scene';
import privateEndpoint from './scenes/private-endpoint?scene';
import managedIdentity from './scenes/managed-identity?scene';
import keyVault from './scenes/key-vault?scene';
import defenderForCloud from './scenes/defender-for-cloud?scene';
import sentinel from './scenes/sentinel?scene';

export default makeProject({
  scenes: [conditionalAccess, privateEndpoint, managedIdentity, keyVault, defenderForCloud, sentinel],
});
