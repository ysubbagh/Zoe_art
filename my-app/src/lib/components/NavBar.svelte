<script>
  export let navLinks = [
    { name: 'Work', href: '/work' },
    { name: 'Sketch', href: '/sketch' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];
  export let artist = 'Zoe Tsai';
</script>

<nav class="nav">
  <a class="logo" href="/">{artist}</a>
  <ul>
    {#each navLinks as link}
      <li><a href={link.href}>{link.name}</a></li>
    {/each}
  </ul>
</nav>