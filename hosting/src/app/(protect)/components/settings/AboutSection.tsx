export function AboutSection() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-lg font-semibold'>About</h2>
      <p className='text-sm text-gray-500'>
        This is a simple hosting service for your static website. You can deploy
        your website using the GitHub integration or upload your files directly.
      </p>
    </div>
  );
}
