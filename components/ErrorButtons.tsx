import { Button } from './ui/button';

export function ErrorButtons() {
  const triggerValidationError = async () => {
    try {
      const response = await fetch('/api/validation-error');
      if (!response.ok) {
        throw new Error('Validation error triggered');
      }
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="destructive"
        onClick={triggerValidationError}
      >
        Trigger Validation Error
      </Button>
    </div>
  );
}