package utils

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/go-git/go-git/v5"
)

func GetFilePaths(repoPath string) ([]string, error) {

	// DFS in development??? 😱
	var filePaths []string
	q := []string{repoPath + "/dist"}

	for len(q) > 0 {
		curr := q[0]
		q = q[1:]

		data, err := os.ReadDir(curr)
		if err != nil {
			return nil, err
		}

		for _, item := range data {
			fullpath := filepath.Join(curr, item.Name())
			if item.IsDir() {
				q = append(q, fullpath+"/")
			} else {
				filePaths = append(filePaths, fullpath)
			}
		}
	}
	return filePaths, nil
}

func ValidateURL(url string) error {
	parts := strings.Split(url, "/")
	owner := parts[len(parts)-2]
	repo := parts[len(parts)-1]

	resp, err := http.Get("https://api.github.com/repos/" + owner + "/" + repo)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	var response map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&response)
	if err != nil {
		return err
	}

	if resp.StatusCode == http.StatusNotFound {
		return fmt.Errorf("repository not found")
	}

	return nil
}

func CloneRepo(url string) error {
	repoName := strings.Split(url, "/")[4]
	destination := "./projects/"

	_, err := git.PlainClone(destination+repoName+"/", false, &git.CloneOptions{
		URL:      url,
		Progress: nil,
	})
	fmt.Println("cloned")
	if err != nil {
		return fmt.Errorf("failed to clone repo: %v", err)
	}
	return nil
}
