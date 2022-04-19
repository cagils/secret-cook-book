import { Button } from '@mantine/core';
import Link from 'next/link';

function TestComp() {
  return (
    <div>
      TestComp
      <br />
      <Link href="/hello" passHref>
        <Button component="a">Next link button</Button>
      </Link>
    </div>
  );
}
// testing 3
export default TestComp;
