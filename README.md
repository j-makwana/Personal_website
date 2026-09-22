# Jenil Makwana — portfolio

This is a static portfolio served directly by GitHub Pages at [j-makwana.github.io/Personal_website/](https://j-makwana.github.io/Personal_website/). The production site needs no build step, package manager, or runtime dependencies: `index.html`, `style.css`, `script.js`, the résumé PDF, and files under `assets/` are published as-is. `.nojekyll` tells GitHub Pages to serve the files without Jekyll processing.

## Preview locally

From the repository root, run:

```sh
preview_dir=$(mktemp -d)
ln -s "$PWD" "$preview_dir/Personal_website"
python3 -m http.server 8000 --directory "$preview_dir"
```

Open <http://localhost:8000/Personal_website/>. This previews the site under the same project path as GitHub Pages, so relative links to images, fonts, CSS, JavaScript, and `Jenil-resume.pdf` can be checked. Stop the server with Ctrl+C.

## Verify

From the repository root, run:

```sh
python3 scripts/verify_content.py
python3 scripts/verify_markup.py
```

The checks use Python's standard library, except that PDF text extraction requires `pypdf` or `PyPDF2`. If neither is installed, run `python3 -m pip install pypdf` and repeat the checks.

## Publish

GitHub Pages is configured to deploy from the `main` branch at the repository root. After the checks and a local browser review pass, merge the verified changes into `main` and push it to `origin`. In the repository's **Settings → Pages**, confirm **Deploy from a branch**, branch **main**, folder **/(root)**. Wait for the Pages deployment to finish, then check the [published site](https://j-makwana.github.io/Personal_website/) on desktop and mobile, including navigation, images, email link, and résumé PDF.
