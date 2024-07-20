import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';

export default function Home() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Simple Expense Tracker</PageHeaderHeading>
        <PageHeaderDescription>
          Track your income, expenses, and budget easily.
        </PageHeaderDescription>
      </PageHeader>
    </div>
  );
}
