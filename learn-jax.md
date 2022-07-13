# Learn \`JAX\`

Doc: [https://jax.readthedocs.io/en/latest/index.html](https://jax.readthedocs.io/en/latest/index.html)

> **JAX is NumPy on the CPU, GPU, and TPU, with great automatic differentiation for high-performance machine learning research.**

### Quickstart

JAX can be Installed with:

```bash
pip install jax
```

Parallel in JAX: [https://jax.readthedocs.io/en/latest/jax-101/06-parallelism.html](https://jax.readthedocs.io/en/latest/jax-101/06-parallelism.html)

{% embed url="https://jax.readthedocs.io/en/latest/jax-101/08-pjit.html" %}

> `pjit` always assumes that the input is the local data chunk of a global array. If the local chunk it to be sharded over multiple local devices and is not partitioned as expected, pjit will put the right slices on the right **local devices** for you. Once all of the local chunks are on the devices on all the hosts, then XLA will run the computation.
