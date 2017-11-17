Inline math
-----------

The area of a circle with radius $r$ is $\pi r^2$.
The volume of a cube with radius $r$ is $\frac{4}{3} \pi r^3$.

The Lorenz Equations
--------------------

$$
\begin{aligned} \dot{x} & = \sigma(y-x) \\ \dot{y} & = \rho x - y
- xz \\ \dot{z} & = -\beta z + xy \end{aligned}
$$


The Cauchy-Schwarz Inequality
-----------------------------

$$
\left( \sum_{k=1}^n a_k b_k \right)^{\!\!2} \leq
\left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n
b_k^2 \right)
$$

A Cross Product Formula
-----------------------

$$
\mathbf{V}_1 \times \mathbf{V}_2 = \begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\ \frac{\partial
X}{\partial u} & \frac{\partial Y}{\partial u} & 0 \\
\frac{\partial X}{\partial v} & \frac{\partial Y}{\partial v} &
0 \\ \end{vmatrix}
$$

The probability of getting \(k\) heads when flipping \(n\) coins is:
------------------------------------------------------------------------
$$
P(E) = {n \choose k} p^k (1-p)^{ n-k}
$$

An Identity of Ramanujan
------------------------
$$
\frac{1}{(\sqrt{\phi \sqrt{5}}-\phi) e^{\frac25 \pi}} =
1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {1+\frac{e^{-6\pi}}
{1+\frac{e^{-8\pi}} {1+\ldots} } } }
$$

Some more tests
---------------
From [here](https://haixing-hu.github.io/programming/2013/09/20/how-to-use-mathjax-in-jekyll-generated-github-pages/) (but without the escaping of `*` and of `\\`).

Some inline math $x$, $y$, $x_1$, $y_1$.

Inline math with special characters: $|\psi\rangle$, $x'$, $x^*$.

Display math:
$$
   |\psi_1\rangle = a|0\rangle + b|1\rangle
$$

Display math with equation number:
$$
  \begin{align}
    |\psi_1\rangle &= a|0\rangle + b|1\rangle \\
    |\psi_2\rangle &= c|0\rangle + d|1\rangle
  \end{align}
$$

Display math without equation number:
$$
  \begin{align*}
    |\psi_1\rangle &= a|0\rangle + b|1\rangle \\
    |\psi_2\rangle &= c|0\rangle + d|1\rangle
  \end{align*}
$$


Even more tests
---------------
From [here](http://drz.ac/2013/01/03/blogging-with-math/) (again looking for special characters):

* The first error is with square brackets. If they are processed as Markdown and disappear, then MathJax will incorrectly process them:

    Example: $y = [z>0]$

* The second error is with underscores: a poor Markdown processor can interpret these as adding emphasis, and hence they can break.

    For example, one integral here: $$ \int_{-\infty}^\infty f(x) \mathop{}\!\mathrm{d}x, $$ and a second integral here: $$\int_{-\infty}^\infty g(t) \mathop{}\!\mathrm{d}t,$$

Did that work?

Some more examples from https://github.com/ickc/pandoc-MathJax-node/

Equation numbering
------------------

Here is an equation:

$$\begin{equation}
x+1\over\sqrt{1-x^2} \label{ref1}
\end{equation}$$

with a reference to ref1: $\ref{ref1}$ , and another numbered one with no
label: $$x+1\over\sqrt{1-x^2}$$

This one uses \\nonumber:
$$x+1\over\sqrt{1-x^2}\nonumber$$

Here's one using the equation environment:

$$\begin{equation}
x+1\over\sqrt{1-x^2}
\end{equation}$$

and one with equation\* environment:

$$\begin{equation*}
x+1\over\sqrt{1-x^2}
\end{equation*}$$

This is a forward reference $\ref{ref2}$ and another $\eqref{ref2}$
for the following equation:

$$\begin{equation}
x+1\over\sqrt{1-x^2}\label{ref2}
\end{equation}$$

More math:

$$x+1\over\sqrt{1-x^2}$$

Here is a ref inside math:
$\ref{ref2}+1$ and text after it.

\begin{align}
x& = y_1-y_2+y_3-y_5+y_8-\dots
&& \text{by \eqref{ref1}}\\
& = y'\circ y^* && \text{(by \eqref{ref3})}\\
& = y(0) y' && \text {by Axiom 1.}
\end{align}

Here's a bad ref $\ref{ref4}$ to a
nonexistent label.

------------------------------------------------------------------------

An alignment:

\begin{align}
a&=b\label{ref3}\cr
&=c+d
\end{align}

and a starred one:

\begin{align*}
a&=b\cr
&=c+d
\end{align*}
