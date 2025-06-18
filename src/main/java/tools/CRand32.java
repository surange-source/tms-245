package tools;

public final class CRand32 {
    private long seed1;
    private long seed2;
    private long seed3;

    public CRand32() {
        final int nextInt = Randomizer.nextInt();
        this.seed(nextInt, nextInt, nextInt);
    }

    public long random() {
        seed1 = seed1 << 12 ^ seed1 >> 19 ^ (seed1 >> 6 ^ seed1 << 12) & 0x1FFFL;
        seed2 = 16L * seed2 ^ seed2 >> 25 ^ (16L * seed2 ^ seed2 >> 23) & 0x7FL;
        seed3 = seed3 >> 11 ^ seed3 << 17 ^ (seed3 >> 8 ^ seed3 << 17) & 0x1FFFFFL;
        return (seed1 ^ seed2 ^ seed3) & 0xFFFFFFFFL;
    }

    public void seed(final int n, final int n2, final int n3) {
        this.seed1 = n | 0x100000;
        this.seed2 = n2 | 0x1000;
        this.seed3 = n3 | 0x10;
    }
}
