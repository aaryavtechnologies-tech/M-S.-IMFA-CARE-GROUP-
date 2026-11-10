@echo off
echo ========================================================
echo  M/S. IMFA CARE GROUP - Pushing Code to GitHub
echo  Account: aaryavtechnologies-tech
echo  Repository: https://github.com/aaryavtechnologies-tech/M-S.-IMFA-CARE-GROUP-
echo ========================================================
echo.
cd /d "%~dp0"
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Code pushed successfully to GitHub!
) else (
    echo [NOTE] If prompted, sign in via your browser or paste your GitHub Personal Access Token.
)
echo.
pause
