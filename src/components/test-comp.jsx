import { Button } from '@mantine/core';
import Link from 'next/link';

function TestComp() {
  return (
    <div>
      TestComp
      <br />
      <Link href="/create-recipe" passHref>
        <Button component="a">Go to create recipe</Button>
      </Link>
    </div>
  );
}
// testing 3
export default TestComp;