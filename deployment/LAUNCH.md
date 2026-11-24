# Manual HiLex launch

While `vercel.json` has `outputDirectory: prelaunch`, only the temporary page is deployed. The original root HTML, assets, contact page, legal documents and membership checkout remain unchanged in Git; they are not present in this temporary deployment. All paths serve the temporary page. The membership subdomain is a separate service and is unchanged.

The countdown uses calendar days in Europe/London, not an unconfirmed launch hour. On and after 28 November 2026 it displays “În curând / Pregătim deschiderea”. It NEVER unlocks automatically.

To open the complete landing page after Bianca confirms launch:
1. Restore `deployment/live.vercel.json` to root `vercel.json`.
2. Commit, push and verify the production deployment is Ready.
3. Check homepage, packages, contact and legal pages on www.hilex.co.uk.

Keep this temporary page available for rollback. Do not expose a supposed password or client-side bypass: none is implemented or needed.
