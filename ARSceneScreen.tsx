/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroAmbientLight,
  ViroAnimations,
  ViroARImageMarker,
  ViroARScene,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroNode,
  ViroOmniLight,
  ViroSpotLight,
  ViroVideo,
} from '@citychallenge/react-viro';

const ARSceneScreen = () => {
  const [pauseUpdates, setPauseUpdates] = useState(false);

  let targetTest = {
    targetTest: {
      source: require('./thantich.png'),
      orientation: 'Up',
      physicalWidth: 0.11,
    },
  };

  useEffect(() => {
    ViroARTrackingTargets.createTargets(targetTest);

    ViroAnimations.registerAnimations({
      scaleModel: {
        properties: {
          opacity: 0.0,
        },
        duration: 500,
      },
    });

    ViroMaterials.createMaterials({
      chromaKeyFilteredVideo: {
        chromaKeyFilteringColor: '#0006fe',
      },
    });
    return () => {};
  }, []);

  const _onAnchorFound = () => {
    // setPauseUpdates(false);
  };

  const _onAnchorUpdate = anchor => {
    // console.log('_onAnchorUpdate: ', anchor.position);
  };

  let MarkerNodeTest = () => (
    <ViroVideo
      source={require('./sontinh_final_video.mp4')}
      height={0.08 * 1.4}
      width={0.11 * 1.4}
      loop={true}
      position={[0.01, 0, -0.02]}
      rotation={[-90, 0, 0]}
      opacity={1}
      materials={['chromaKeyFilteredVideo']}
    />
  );

  return (
    <ViroARScene>
      <ViroNode dragType="FixedToWorld">
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroARImageMarker
          target={'targetTest'}
          onAnchorFound={_onAnchorFound}
          onAnchorUpdated={_onAnchorUpdate}
          pauseUpdates={pauseUpdates}>
          <MarkerNodeTest />
        </ViroARImageMarker>
        <ViroOmniLight
          intensity={300}
          position={[-10, 10, 1]}
          color={'#FFFFFF'}
          attenuationStartDistance={20}
          attenuationEndDistance={30}
        />

        <ViroOmniLight
          intensity={300}
          position={[10, 10, 1]}
          color={'#FFFFFF'}
          attenuationStartDistance={20}
          attenuationEndDistance={30}
        />

        <ViroOmniLight
          intensity={300}
          position={[-10, -10, 1]}
          color={'#FFFFFF'}
          attenuationStartDistance={20}
          attenuationEndDistance={30}
        />

        <ViroOmniLight
          intensity={300}
          position={[10, -10, 1]}
          color={'#FFFFFF'}
          attenuationStartDistance={20}
          attenuationEndDistance={30}
        />

        <ViroSpotLight
          position={[0, 8, -2]}
          color="#ffffff"
          direction={[0, -1, 0]}
          intensity={50}
          attenuationStartDistance={5}
          attenuationEndDistance={10}
          innerAngle={5}
          outerAngle={20}
          castsShadow={true}
        />
      </ViroNode>
    </ViroARScene>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default ARSceneScreen;
