// import ThreeScene from './ThreeScene/ThreeScene';
import ComplexSceneWithLightAndTexture from './ComplexSceneWithLightAndTexture/ComplexSceneWithLightAndTexture';
import RotatingEarthWithLight from './RotatingEarthWithLight/RotatingEarthWithLight';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <ThreeScene /> */}
      <ComplexSceneWithLightAndTexture />
      <RotatingEarthWithLight />
    </div>
  );
};
