declare module "vanta/dist/vanta.waves.min" {
  const WAVES: (options: Record<string, unknown>) => {
    destroy?: () => void;
    resize?: () => void;
    renderer?: {
      dispose?: () => void;
      forceContextLoss?: () => void;
    };
  };
  export default WAVES;
}
