import { LoginForm } from '@/app/(public)/(auth)/_components/login-form';

export default function LoginPage() {
  return (
    <div className="container">
      <section className="mx-auto flex flex-col items-start gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <LoginForm />
      </section>
    </div>
  );
}
